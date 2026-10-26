import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { ExportInfo, Snapshot } from './snapshot'

const here = dirname(fileURLToPath(import.meta.url))
const toolRoot = resolve(here, '..')

export interface PropChange {
  exportName: string
  added: string[]
  removed: string[]
  changedType: { name: string; from: string; to: string }[]
}

export interface Diff {
  from: string
  to: string
  addedExports: Record<string, string[]>
  removedExports: Record<string, string[]>
  propChanges: PropChange[]
  addedTokens: string[]
  removedTokens: string[]
  changedTokens: { name: string; ctx: string; from?: string; to?: string }[]
  addedIcons: string[]
  removedIcons: string[]
  addedFlags: string[]
  removedFlags: string[]
  subpathChanges: { added: string[]; removed: string[] }
  breaking: string[]
}

function byName(list: ExportInfo[]): Map<string, ExportInfo> {
  return new Map(list.map((e) => [e.name, e]))
}

export function diffSnapshots(a: Snapshot, b: Snapshot): Diff {
  const diff: Diff = {
    from: a.version,
    to: b.version,
    addedExports: {},
    removedExports: {},
    propChanges: [],
    addedTokens: [],
    removedTokens: [],
    changedTokens: [],
    addedIcons: [],
    removedIcons: [],
    addedFlags: [],
    removedFlags: [],
    subpathChanges: { added: [], removed: [] },
    breaking: [],
  }

  for (const key of new Set([...Object.keys(a.entrypoints), ...Object.keys(b.entrypoints)])) {
    const am = byName(a.entrypoints[key] ?? [])
    const bm = byName(b.entrypoints[key] ?? [])
    const added = [...bm.keys()].filter((x) => !am.has(x)).sort()
    const removed = [...am.keys()].filter((x) => !bm.has(x)).sort()
    if (added.length) diff.addedExports[key] = added
    if (removed.length) {
      diff.removedExports[key] = removed
      diff.breaking.push(`removed exports in ${key}: ${removed.slice(0, 10).join(', ')}${removed.length > 10 ? ` (+${removed.length - 10})` : ''}`)
    }
    for (const name of [...am.keys()].filter((x) => bm.has(x))) {
      const pa = new Map((am.get(name)?.props ?? []).map((p) => [p.name, p]))
      const pb = new Map((bm.get(name)?.props ?? []).map((p) => [p.name, p]))
      const addedP = [...pb.keys()].filter((x) => !pa.has(x))
      const removedP = [...pa.keys()].filter((x) => !pb.has(x))
      const changedType = [...pa.keys()]
        .filter((x) => pb.has(x) && pa.get(x)?.type !== pb.get(x)?.type)
        .map((x) => ({ name: x, from: pa.get(x)?.type ?? '', to: pb.get(x)?.type ?? '' }))
      const ta = am.get(name)?.typeText
      const tb = bm.get(name)?.typeText
      const typeChanged = ta !== tb && (ta || tb) && !pa.size && !pb.size
      if (addedP.length || removedP.length || changedType.length || typeChanged) {
        diff.propChanges.push({ exportName: `${key}:${name}`, added: addedP, removed: removedP, changedType })
        if (removedP.length) diff.breaking.push(`removed props in ${key}:${name}: ${removedP.join(', ')}`)
        if (changedType.length) diff.breaking.push(`changed prop types in ${key}:${name}: ${changedType.map((c) => c.name).join(', ')}`)
      }
    }
  }

  const at = new Set(Object.keys(a.tokens))
  const bt = new Set(Object.keys(b.tokens))
  diff.addedTokens = [...bt].filter((x) => !at.has(x)).sort()
  diff.removedTokens = [...at].filter((x) => !bt.has(x)).sort()
  if (diff.removedTokens.length) diff.breaking.push(`removed tokens: ${diff.removedTokens.slice(0, 10).join(', ')}${diff.removedTokens.length > 10 ? ` (+${diff.removedTokens.length - 10})` : ''}`)
  for (const name of [...at].filter((x) => bt.has(x))) {
    for (const ctx of ['root', 'dark', 'theme'] as const) {
      const fa = a.tokens[name][ctx]
      const fb = b.tokens[name][ctx]
      if (fa !== fb && (fa || fb)) diff.changedTokens.push({ name, ctx, from: fa, to: fb })
    }
  }
  if (diff.changedTokens.length) diff.breaking.push(`${diff.changedTokens.length} token value changes (visual review needed)`)

  const ai = new Set([...a.icons.static, ...a.icons.animated])
  const bi = new Set([...b.icons.static, ...b.icons.animated])
  diff.addedIcons = [...bi].filter((x) => !ai.has(x)).sort()
  diff.removedIcons = [...ai].filter((x) => !bi.has(x)).sort()
  if (diff.removedIcons.length) diff.breaking.push(`removed icons: ${diff.removedIcons.join(', ')}`)

  const af = new Set(a.flags)
  const bf = new Set(b.flags)
  diff.addedFlags = [...bf].filter((x) => !af.has(x)).sort()
  diff.removedFlags = [...af].filter((x) => !bf.has(x)).sort()

  const as = new Set(a.subpaths)
  const bs = new Set(b.subpaths)
  diff.subpathChanges = { added: [...bs].filter((x) => !as.has(x)), removed: [...as].filter((x) => !bs.has(x)) }
  if (diff.subpathChanges.removed.length) diff.breaking.push(`removed subpaths: ${diff.subpathChanges.removed.join(', ')}`)

  return diff
}

export function renderMarkdown(d: Diff): string {
  const L: string[] = [`# upstream diff ${d.from} → ${d.to}`, '']
  const totalChanged =
    Object.values(d.addedExports).flat().length +
    Object.values(d.removedExports).flat().length +
    d.propChanges.length +
    d.addedTokens.length +
    d.removedTokens.length +
    d.changedTokens.length +
    d.addedIcons.length +
    d.removedIcons.length
  L.push(totalChanged === 0 ? 'No changes.' : `Changed items: ${totalChanged}`)
  L.push('')
  if (d.breaking.length) {
    L.push('> [!WARNING]', '> Possible breaking changes:', ...d.breaking.map((b) => `> - ${b}`), '')
  }
  for (const [entry, names] of Object.entries(d.addedExports)) {
    L.push(`## added exports (${entry}): +${names.length}`)
    for (const n of names.slice(0, 60)) L.push(`+ ${n}`)
    if (names.length > 60) L.push(`… (+${names.length - 60} more)`)
    L.push('')
  }
  for (const [entry, names] of Object.entries(d.removedExports)) {
    L.push(`## removed exports (${entry}): −${names.length}`)
    for (const n of names) L.push(`− ${n}`)
    L.push('')
  }
  if (d.propChanges.length) {
    L.push(`## changed props/types: ${d.propChanges.length}`)
    for (const c of d.propChanges.slice(0, 40)) {
      L.push(`### ${c.exportName}`)
      for (const n of c.added) L.push(`+ prop ${n}`)
      for (const n of c.removed) L.push(`− prop ${n}`)
      for (const t of c.changedType) L.push(`~ prop ${t.name}: \`${t.from.slice(0, 120)}\` → \`${t.to.slice(0, 120)}\``)
    }
    if (d.propChanges.length > 40) L.push(`… (+${d.propChanges.length - 40} more)`)
    L.push('')
  }
  if (d.addedTokens.length || d.removedTokens.length || d.changedTokens.length) {
    L.push(`## tokens: +${d.addedTokens.length} −${d.removedTokens.length} ~${d.changedTokens.length}`)
    for (const n of d.addedTokens.slice(0, 30)) L.push(`+ ${n}`)
    for (const n of d.removedTokens.slice(0, 30)) L.push(`− ${n}`)
    for (const t of d.changedTokens.slice(0, 30)) L.push(`~ ${t.name} [${t.ctx}]: \`${(t.from ?? '').slice(0, 80)}\` → \`${(t.to ?? '').slice(0, 80)}\``)
    L.push('')
  }
  if (d.addedIcons.length || d.removedIcons.length) {
    L.push(`## icons: +${d.addedIcons.length} −${d.removedIcons.length}`)
    for (const n of d.addedIcons) L.push(`+ ${n}`)
    for (const n of d.removedIcons) L.push(`− ${n}`)
    L.push('')
  }
  if (d.addedFlags.length || d.removedFlags.length) {
    L.push(`## flags: +${d.addedFlags.length} −${d.removedFlags.length}`)
    for (const n of d.addedFlags) L.push(`+ ${n}`)
    for (const n of d.removedFlags) L.push(`− ${n}`)
    L.push('')
  }
  return L.join('\n') + '\n'
}

export function compareVersions(aVer: string, bVer: string, dir?: string): Diff {
  const snapDir = dir ?? resolve(toolRoot, 'snapshots')
  const a: Snapshot = JSON.parse(readFileSync(resolve(snapDir, `${aVer}.json`), 'utf8'))
  const b: Snapshot = JSON.parse(readFileSync(resolve(snapDir, `${bVer}.json`), 'utf8'))
  const d = diffSnapshots(a, b)
  writeFileSync(resolve(snapDir, `diff-${aVer}-${bVer}.json`), JSON.stringify(d, null, 2))
  const md = renderMarkdown(d)
  writeFileSync(resolve(snapDir, `diff-${aVer}-${bVer}.md`), md)
  console.log(md)
  return d
}

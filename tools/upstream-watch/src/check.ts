import { readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { takeSnapshot } from './snapshot'

const here = dirname(fileURLToPath(import.meta.url))
const toolRoot = resolve(here, '..')

export async function latestRegistryVersion(): Promise<string> {
  const res = await fetch('https://registry.npmjs.org/@fanvue%2Fui/latest')
  if (!res.ok) throw new Error(`registry responded ${res.status}`)
  const meta = (await res.json()) as { version: string }
  return meta.version
}

export function localVersions(): string[] {
  return readdirSync(resolve(toolRoot, 'snapshots'))
    .filter((f) => f.endsWith('.json') && !f.startsWith('diff-'))
    .map((f) => f.replace('.json', ''))
    .sort()
}

export async function check(): Promise<void> {
  const latest = await latestRegistryVersion()
  const local = localVersions()
  console.log(`registry latest: ${latest}`)
  console.log(`local snapshots: ${local.join(', ') || '(none)'}`)
  if (!local.includes(latest)) {
    console.log(`NEW VERSION: ${latest} — run: watch snapshot ${latest} --fetch`)
    process.exitCode = 2
  } else {
    console.log('up to date')
  }
}

export async function snapshotVersion(version: string, fetchRemote: boolean): Promise<void> {
  if (!fetchRemote) {
    takeSnapshot({ version })
    return
  }
  const tmp = resolve(toolRoot, '.tmp-upstream')
  const { mkdirSync, rmSync } = await import('node:fs')
  mkdirSync(tmp, { recursive: true })
  const tgz = resolve(tmp, `ui-${version}.tgz`)
  console.log(`downloading @fanvue/ui@${version}…`)
  const res = await fetch(`https://registry.npmjs.org/@fanvue/ui/-/ui-${version}.tgz`)
  if (!res.ok) throw new Error(`tarball responded ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const { writeFileSync } = await import('node:fs')
  writeFileSync(tgz, buf)
  const proc = Bun.spawnSync(['tar', '-xzf', tgz, '-C', tmp])
  if (proc.exitCode !== 0) throw new Error(`tar failed: ${proc.stderr.toString().slice(0, 300)}`)
  takeSnapshot({ version, pkgDir: resolve(tmp, 'package') })
  rmSync(tmp, { recursive: true, force: true })
}

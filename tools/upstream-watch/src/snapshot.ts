import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const here = dirname(fileURLToPath(import.meta.url))
const toolRoot = resolve(here, '..')

export interface PropMember {
  name: string
  optional: boolean
  type: string
}

export interface ExportInfo {
  name: string
  kind: 'const' | 'type' | 'interface' | 'function' | 'class'
  typeText?: string
  aliasOf?: string
  union?: string[]
  props?: PropMember[]
}

export interface Snapshot {
  version: string
  takenAt: string
  entrypoints: Record<string, ExportInfo[]>
  subpaths: string[]
  icons: { static: string[]; animated: string[] }
  flags: string[]
  tokens: Record<string, { root?: string; dark?: string; theme?: string }>
  peerDependencies: Record<string, string>
}

function membersOf(node: ts.Node, sf: ts.SourceFile): PropMember[] {
  const out: PropMember[] = []
  const push = (m: ts.TypeElement) => {
    if (ts.isPropertySignature(m) && m.name) {
      out.push({
        name: m.name.getText(sf),
        optional: !!m.questionToken,
        type: m.type ? m.type.getText(sf).replace(/\s+/g, ' ') : 'unknown',
      })
    }
  }
  if (ts.isInterfaceDeclaration(node)) node.members.forEach(push)
  if (ts.isTypeAliasDeclaration(node) && ts.isTypeLiteralNode(node.type)) node.type.members.forEach(push)
  return out
}

function parseDts(file: string): ExportInfo[] {
  const content = readFileSync(file, 'utf8')
  const sf = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true)
  const declared = new Map<string, ExportInfo>()
  const exported = new Set<string>()

  for (const st of sf.statements) {
    const hasExport = !!((st as unknown as { modifiers?: ts.NodeArray<ts.Modifier> }).modifiers ?? []).some(
      (m) => m.kind === ts.SyntaxKind.ExportKeyword,
    )
    if (ts.isVariableStatement(st)) {
      for (const d of st.declarationList.declarations) {
        if (!ts.isIdentifier(d.name)) continue
        const info: ExportInfo = { name: d.name.text, kind: 'const' }
        if (d.type) info.typeText = d.type.getText(sf).replace(/\s+/g, ' ')
        declared.set(info.name, info)
        if (hasExport) exported.add(info.name)
      }
    } else if (ts.isTypeAliasDeclaration(st) || ts.isInterfaceDeclaration(st) || ts.isFunctionDeclaration(st) || ts.isClassDeclaration(st)) {
      if (!st.name || !ts.isIdentifier(st.name)) continue
      const kind = ts.isTypeAliasDeclaration(st) ? 'type' : ts.isInterfaceDeclaration(st) ? 'interface' : ts.isFunctionDeclaration(st) ? 'function' : 'class'
      const info: ExportInfo = { name: st.name.text, kind }
      if ((ts.isTypeAliasDeclaration(st) || ts.isInterfaceDeclaration(st)) && !ts.isFunctionDeclaration(st) && !ts.isClassDeclaration(st)) {
        const props = membersOf(st, sf)
        if (props.length) info.props = props
      }
      if (ts.isTypeAliasDeclaration(st) && (ts.isTypeReferenceNode(st.type) || ts.isUnionTypeNode(st.type))) {
        info.typeText = st.type.getText(sf).replace(/\s+/g, ' ').slice(0, 500)
      }
      if (ts.isTypeAliasDeclaration(st) && ts.isUnionTypeNode(st.type)) {
        const lits = st.type.types.filter(ts.isLiteralTypeNode).map((t) => (ts.isStringLiteral(t.literal) ? t.literal.text : t.getText(sf)))
        if (lits.length) info.union = lits
      }
      declared.set(info.name, info)
      if (hasExport) exported.add(info.name)
    } else if (ts.isExportDeclaration(st) && st.exportClause && ts.isNamedExports(st.exportClause)) {
      for (const e of st.exportClause.elements) exported.add(e.propertyName ? e.propertyName.text : e.name.text)
    }
  }

  const result: ExportInfo[] = []
  for (const name of exported) {
    const info = declared.get(name)
    if (info) {
      const propsType = declared.get(`${name}Props`)
      if (propsType?.props && !info.props) info.props = propsType.props
      result.push(info)
    } else {
      result.push({ name, kind: 'type' })
    }
  }
  return result.sort((a, b) => (a.name < b.name ? -1 : 1))
}

function parseTokens(css: string): Snapshot['tokens'] {
  const tokens: Snapshot['tokens'] = {}
  const blockRe = /([^{}]+)\{([^{}]*)\}/g
  let m: RegExpExecArray | null
  while ((m = blockRe.exec(css))) {
    const selector = m[1].replace(/\/\*[\s\S]*?\*\//g, '').trim()
    const ctx = selector === ':root' ? 'root' : selector === '.dark' ? 'dark' : selector === '@theme' ? 'theme' : null
    if (!ctx) continue
    const declRe = /(--[\w-]+)\s*:\s*([^;]+);/g
    let d: RegExpExecArray | null
    while ((d = declRe.exec(m[2]))) {
      const name = d[1]
      const value = d[2].trim().replace(/\s+/g, ' ')
      tokens[name] = { ...(tokens[name] ?? {}), [ctx]: value }
    }
  }
  return tokens
}

function isIconName(name: string): boolean {
  return name.endsWith('Icon') && name !== 'IconButton' && name !== 'ButtonIconGroup'
}

export function takeSnapshot(opts: { version?: string; pkgDir?: string; outDir?: string } = {}): Snapshot {
  const pkgDir = opts.pkgDir ?? resolve(toolRoot, 'node_modules/@fanvue/ui')
  const pkg = JSON.parse(readFileSync(resolve(pkgDir, 'package.json'), 'utf8'))
  const version: string = opts.version ?? pkg.version
  const entrypoints: Record<string, ExportInfo[]> = {}
  for (const name of ['index', 'charts', 'date-picker', 'flags', 'animated-icons']) {
    const p = resolve(pkgDir, `dist/${name}.d.ts`)
    if (existsSync(p)) entrypoints[name] = parseDts(p)
  }
  const css = readFileSync(resolve(pkgDir, 'dist/styles/theme.css'), 'utf8')
  const tokens = parseTokens(css)
  const names = (entry: string) => (entrypoints[entry] ?? []).map((e) => e.name)
  const staticIcons = names('index').filter(isIconName)
  const animatedIcons = names('animated-icons').filter(isIconName)
  const flagsType = (entrypoints['flags'] ?? []).find((e) => e.name === 'CountryFlagCode')
  const flags = flagsType?.union ?? (flagsType?.typeText ?? '').split('|').map((s) => s.trim().replace(/^['"]|['"]$/g, '')).filter((s) => s && s !== 'string')

  const snap: Snapshot = {
    version,
    takenAt: new Date().toISOString(),
    entrypoints,
    subpaths: Object.keys(pkg.exports ?? {}),
    icons: { static: staticIcons, animated: animatedIcons },
    flags,
    tokens,
    peerDependencies: pkg.peerDependencies ?? {},
  }
  const outDir = opts.outDir ?? resolve(toolRoot, 'snapshots')
  mkdirSync(outDir, { recursive: true })
  writeFileSync(resolve(outDir, `${version}.json`), JSON.stringify(snap, null, 2))
  const totalExports = Object.values(entrypoints).reduce((n, list) => n + list.length, 0)
  console.log(`snapshot ${version}: ${totalExports} exports, ${staticIcons.length}+${animatedIcons.length} icons, ${flags.length} flags, ${Object.keys(tokens).length} tokens`)
  return snap
}

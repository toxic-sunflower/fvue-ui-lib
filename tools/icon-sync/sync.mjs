import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(here, '../..')
const uiSrc = resolve(repoRoot, 'packages/ui/src')

const OWNER = 'fanvue'
const REPO = 'fanv-ui'
const REF = 'main'

async function listDir(dirPath) {
  const out = []
  const seen = new Set()
  for (let page = 1; page <= 5; page++) {
    const res = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${dirPath}?ref=${REF}&per_page=100&page=${page}`,
      { headers: { Accept: 'application/vnd.github+json' } },
    )
    if (!res.ok) throw new Error(`listing ${dirPath}: ${res.status}`)
    const items = await res.json()
    if (!Array.isArray(items) || items.length === 0) break
    for (const item of items) {
      if (!seen.has(item.path)) {
        seen.add(item.path)
        out.push(item)
      }
    }
    if (items.length < 100) break
  }
  return out
}

async function getRaw(filePath) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 25000)
  try {
    const res = await fetch(`https://raw.githubusercontent.com/${OWNER}/${REPO}/${REF}/${filePath}`, { signal: ctrl.signal })
    if (!res.ok) throw new Error(`raw ${filePath}: ${res.status}`)
    return res.text()
  } finally {
    clearTimeout(timer)
  }
}

async function eachLimit(items, limit, fn) {
  const results = []
  for (let i = 0; i < items.length; i += limit) {
    const chunk = items.slice(i, i + limit)
    results.push(...(await Promise.all(chunk.map(fn))))
  }
  return results
}

function astToValue(node, sf) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (node.kind === ts.SyntaxKind.NullKeyword) return null
  if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(node.operand)) {
    return -Number(node.operand.text)
  }
  if (ts.isArrayLiteralExpression(node)) return node.elements.map((e) => astToValue(e, sf))
  if (ts.isObjectLiteralExpression(node)) {
    const obj = {}
    for (const p of node.properties) {
      if (!ts.isPropertyAssignment(p)) continue
      const key = ts.isIdentifier(p.name) ? p.name.text : ts.isStringLiteral(p.name) ? p.name.text : p.name.getText(sf)
      obj[key] = astToValue(p.initializer, sf)
    }
    return obj
  }
  throw new Error(`unsupported node: ${ts.SyntaxKind[node.kind]} (${node.getText(sf).slice(0, 60)})`)
}

function extractVariants(src) {
  const sf = ts.createSourceFile('icon.tsx', src, ts.ScriptTarget.Latest, true)
  for (const st of sf.statements) {
    if (!ts.isVariableStatement(st)) continue
    for (const d of st.declarationList.declarations) {
      if (ts.isIdentifier(d.name) && d.name.text === 'VARIANTS' && d.initializer && ts.isObjectLiteralExpression(d.initializer)) {
        return astToValue(d.initializer, sf)
      }
    }
  }
  return null
}

function iconSfc(name, variants) {
  return `<script setup lang="ts">
import { computed } from 'vue'
import type { IconSize } from '../types'

const props = withDefaults(defineProps<{ size?: IconSize; filled?: boolean }>(), {
  size: 24,
  filled: false,
})

const VARIANTS = ${JSON.stringify(variants)} as Record<number, { outlined: { d: string; sw?: number; eo?: boolean }[]; filled?: { d: string; sw?: number; eo?: boolean }[] }>

const current = computed(() => VARIANTS[props.size] ?? VARIANTS[24])
const showFilled = computed(() => !!(props.filled && current.value?.filled))
</script>

<template>
  <svg :viewBox="\`0 0 \${size} \${size}\`" :width="size" :height="size" fill="none" aria-hidden="true" class="fvue-icon">
    <g :class="['fvue-icon__layer', showFilled && 'fvue-icon__layer--hidden']">
      <path
        v-for="p in current?.outlined ?? []"
        :key="p.d"
        :d="p.d"
        :stroke="p.sw !== undefined ? 'currentColor' : undefined"
        :stroke-width="p.sw"
        stroke-linecap="round"
        stroke-linejoin="round"
        :fill="p.sw !== undefined ? undefined : 'currentColor'"
        :fill-rule="p.eo ? 'evenodd' : undefined"
        :clip-rule="p.eo ? 'evenodd' : undefined"
      />
    </g>
    <g v-if="current?.filled" :class="['fvue-icon__layer', showFilled ? undefined : 'fvue-icon__layer--hidden']">
      <path
        v-for="p in current.filled ?? []"
        :key="p.d"
        :d="p.d"
        :stroke="p.sw !== undefined ? 'currentColor' : undefined"
        :stroke-width="p.sw"
        stroke-linecap="round"
        stroke-linejoin="round"
        :fill="p.sw !== undefined ? undefined : 'currentColor'"
        :fill-rule="p.eo ? 'evenodd' : undefined"
        :clip-rule="p.eo ? 'evenodd' : undefined"
      />
    </g>
  </svg>
</template>
`
}

function animatedSfc(name, info) {
  const paths = info.paths.map((d) => `      <path d="${d}"${info.draw ? ' pathLength="1" class="fvue-animated-icon__draw"' : ''} />`).join('\n')
  return `<script setup lang="ts">
import { ref } from 'vue'
import type { IconSize } from '../types'

const props = withDefaults(
  defineProps<{ size?: IconSize; playing?: boolean; label?: string }>(),
  { size: 24, playing: false },
)

const active = ref(false)

function startAnimation() {
  active.value = false
  requestAnimationFrame(() => {
    active.value = true
  })
}

function stopAnimation() {
  active.value = false
}

defineExpose({ startAnimation, stopAnimation })
</script>

<template>
  <svg
    viewBox="${info.viewBox}"
    :width="size"
    :height="size"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="${info.strokeWidth}"
    :class="['fvue-animated-icon', (playing || active) && 'fvue-animated-icon--playing']"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : true"
    @mouseenter="startAnimation"
    @mouseleave="stopAnimation"
  >
${paths}
  </svg>
</template>
`
}

const JSX_ATTR = {
  strokeWidth: 'stroke-width',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  fillRule: 'fill-rule',
  clipRule: 'clip-rule',
  clipPath: 'clip-path',
  stopColor: 'stop-color',
  stopOpacity: 'stop-opacity',
  className: 'class',
}

function stripMotionProps(inner) {
  let out = inner
  for (const attr of ['animate', 'initial', 'variants', 'transition', 'exit', 'onMouseEnter', 'onMouseLeave']) {
    let idx = out.indexOf(`${attr}={`)
    while (idx !== -1) {
      let depth = 0
      let end = -1
      for (let i = idx + attr.length + 1; i < out.length; i++) {
        if (out[i] === '{') depth++
        else if (out[i] === '}') {
          depth--
          if (depth === 0) {
            end = i
            break
          }
        }
      }
      if (end === -1) break
      out = out.slice(0, idx) + out.slice(end + 1)
      idx = out.indexOf(`${attr}={`)
    }
  }
  return out
}

function extractLegacy(src) {
  const m = /<svg([^>]*)>([\s\S]*?)<\/svg>/.exec(src)
  if (!m) return null
  const viewBox = /viewBox="([^"]+)"/.exec(m[1])?.[1]
  if (!viewBox) return null
  let inner = m[2]
    .replace(/\{\.\.\.props\}/g, '')
    .replace(/\{\/\*[^]*?\*\/\}/g, '')
    .replace(/<(\/?)motion\./g, '<$1')
  inner = stripMotionProps(inner)
  for (const [from, to] of Object.entries(JSX_ATTR)) {
    inner = inner.replaceAll(`${from}=`, `${to}=`)
  }
  inner = inner.replace(/([a-zA-Z-]+)=\{([^{}]+)\}/g, (full, attr, val) => {
    const v = val.trim()
    if (/^-?[\d.]+$/.test(v)) return `${attr}="${v}"`
    const str = /^"([^"]*)"$/.exec(v) ?? /^'([^']*)'$/.exec(v)
    if (str) return `${attr}="${str[1]}"`
    return full
  })
  if (/\{[^}]*\}/.test(inner.replace(/\{\.\.\.[^}]*\}/g, ''))) return null
  const vb = viewBox.split(/\s+/).map(Number)
  const defaultSize = vb.length === 4 && vb[2] === vb[3] ? vb[2] : 24
  return { viewBox, inner: inner.trim(), defaultSize }
}

function legacySfc(info) {
  return `<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: ${info.defaultSize} })
</script>

<template>
  <svg viewBox="${info.viewBox}" :width="size" :height="size" fill="none" aria-hidden="true" class="fvue-icon">
    ${info.inner}
  </svg>
</template>
`
}

function extractAnimated(src) {
  const sf = ts.createSourceFile('aicon.tsx', src, ts.ScriptTarget.Latest, true)
  const text = sf.text
  const viewBox = /viewBox="([^"]+)"/.exec(text)?.[1] ?? '0 0 24 24'
  const strokeWidth = /strokeWidth="([^"]+)"/.exec(text)?.[1] ?? '2'
  const paths = []
  const pathRe = /<(?:motion\.)?path\b([^>]*?)(?:\/>|>([\s\S]*?)<\/(?:motion\.)?path>)/g
  let m
  while ((m = pathRe.exec(text))) {
    const d = /\bd="([^"]+)"/.exec(m[1])?.[1]
    if (d) paths.push(d)
  }
  const draw = /motion\.path[\s\S]{0,400}?pathLength/.test(text)
  return paths.length ? { viewBox, strokeWidth, paths, draw } : null
}

export async function syncIcons() {
  const items = await listDir('src/components/Icons')
  const files = items.filter((i) => i.type === 'file' && i.name.endsWith('Icon.tsx') && !['BaseIcon.tsx'].includes(i.name))
  console.log(`icons: ${files.length} files`)
  const dir = resolve(uiSrc, 'icons')
  mkdirSync(dir, { recursive: true })
  const names = []
  const skipped = []
  await eachLimit(files, 12, async (f) => {
    const name = f.name.replace(/\.tsx$/, '')
    try {
      const src = await getRaw(f.path)
      const variants = extractVariants(src)
      if (variants) {
        writeFileSync(resolve(dir, `${name}.vue`), iconSfc(name, variants))
        names.push(name)
        return
      }
      const legacy = extractLegacy(src)
      if (legacy) {
        writeFileSync(resolve(dir, `${name}.vue`), legacySfc(legacy))
        names.push(name)
        return
      }
      skipped.push(name)
    } catch (e) {
      console.error(`icon ${name}:`, e instanceof Error ? e.message : e)
      skipped.push(name)
    }
  })
  const barrel = names.map((n) => `export { default as ${n} } from './icons/${n}.vue'`).join('\n') + '\n'
  writeFileSync(resolve(uiSrc, 'icons.ts'), barrel)
  console.log(`icons written: ${names.length}, skipped: ${skipped.length}${skipped.length ? ` (${skipped.join(', ')})` : ''}`)
  return names
}

export async function syncAnimated() {
  const items = await listDir('src/components/AnimatedIcons')
  const files = items.filter((i) => i.type === 'file' && i.name.endsWith('Icon.tsx'))
  console.log(`animated icons: ${files.length} files`)
  const dir = resolve(uiSrc, 'animated')
  mkdirSync(dir, { recursive: true })
  const names = []
  const skipped = []
  const staticFallback = []
  await eachLimit(files, 12, async (f) => {
    const name = f.name.replace(/\.tsx$/, '')
    try {
      const src = await getRaw(f.path)
      const info = extractAnimated(src)
      if (info) {
        writeFileSync(resolve(dir, `${name}.vue`), animatedSfc(name, info))
        names.push(name)
        return
      }
      const legacy = extractLegacy(src)
      if (legacy) {
        writeFileSync(resolve(dir, `${name}.vue`), legacySfc(legacy))
        names.push(name)
        staticFallback.push(name)
        return
      }
      skipped.push(name)
    } catch (e) {
      console.error(`animated ${name}:`, e instanceof Error ? e.message : e)
      skipped.push(name)
    }
  })
  const { copyFileSync, existsSync } = await import('node:fs')
  const stillSkipped = []
  for (const name of skipped) {
    const staticFile = resolve(uiSrc, 'icons', `${name}.vue`)
    if (existsSync(staticFile)) {
      copyFileSync(staticFile, resolve(dir, `${name}.vue`))
      names.push(name)
      staticFallback.push(`${name} (static twin)`)
    } else {
      stillSkipped.push(name)
    }
  }
  skipped.length = 0
  skipped.push(...stillSkipped)
  const barrel = names.sort().map((n) => `export { default as ${n} } from './animated/${n}.vue'`).join('\n') + '\n'
  writeFileSync(resolve(uiSrc, 'animated.ts'), barrel)
  console.log(`animated written: ${names.length}, static-fallback: ${staticFallback.length}${staticFallback.length ? ` (${staticFallback.join(', ')})` : ''}, skipped: ${skipped.length}${skipped.length ? ` (${skipped.join(', ')})` : ''}`)
  return names
}

export async function syncFlags() {
  const src = await getRaw('src/components/CountryFlag/flagShapes.ts')
  if (/from\s+['"]react['"]|require\(['"]react['"]\)/.test(src)) throw new Error('flagShapes imports react, manual port needed')
  writeFileSync(resolve(uiSrc, 'flagShapes.ts'), `// Generated from @fanvue/ui (Apache-2.0) — do not edit by hand.\n${src}`)
  console.log('flags: flagShapes.ts synced')
}

const [mode] = Bun.argv.slice(2)
if (!mode || mode === 'icons') await syncIcons()
if (!mode || mode === 'flags') await syncFlags()
if (!mode || mode === 'animated') await syncAnimated()

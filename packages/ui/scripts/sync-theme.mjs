import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// Vendors the upstream theme into this package so consumers never need
// `@fanvue/ui` installed: src/theme.css + src/base.css carry the real content.
const here = dirname(fileURLToPath(import.meta.url))
const pkg = resolve(here, '..')
const upstream = resolve(pkg, 'node_modules/@fanvue/ui/dist/styles')

const header = (file) => `/**
 * Vendored from @fanvue/ui (Apache-2.0, (c) Shift Holdings Ltd / Fanvue).
 * DO NOT EDIT. Re-sync with: bun run sync:theme
 * Upstream source: node_modules/@fanvue/ui/dist/styles/${file}
 */
`

for (const file of ['theme.css', 'base.css']) {
  const src = resolve(upstream, file)
  if (!existsSync(src)) {
    console.log(`skip sync: ${src} not found (run bun install at root)`)
    process.exit(0)
  }
  const body = readFileSync(src, 'utf8').replace(/^\s*\n/, '')
  writeFileSync(resolve(pkg, 'src', file), header(file) + body)
  console.log(`vendored -> src/${file}`)
}

import { copyFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// The real CJS bundles are built by vite (LIB_FORMAT=cjs).
// This only mirrors the ESM type declarations as .d.cts next to them.
const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const entries = ['index', 'charts', 'date-picker', 'flags', 'animated-icons']

for (const name of entries) {
  copyFileSync(resolve(root, `dist/${name}.d.ts`), resolve(root, `dist/cjs/${name}.d.cts`))
}
console.log('cjs type stubs written')

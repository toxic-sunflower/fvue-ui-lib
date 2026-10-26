import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const entries = ['index', 'charts', 'date-picker', 'flags', 'animated-icons']

mkdirSync(resolve(root, 'dist/cjs'), { recursive: true })
for (const name of entries) {
  copyFileSync(resolve(root, `dist/${name}.mjs`), resolve(root, `dist/cjs/${name}.cjs`))
  copyFileSync(resolve(root, `dist/${name}.d.ts`), resolve(root, `dist/cjs/${name}.d.cts`))
}
console.log('cjs stubs written')

import { copyFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const pkg = resolve(here, '..')
const src = resolve(pkg, 'node_modules/@fanvue/ui/dist/styles/theme.css')

if (!existsSync(src)) {
  console.log('skip sync: @fanvue/ui not installed in ui package (run bun install at root)')
  process.exit(0)
}
copyFileSync(src, resolve(pkg, 'src/theme.css.generated'))
console.log('theme synced -> src/theme.css.generated (diff against src/theme.css)')

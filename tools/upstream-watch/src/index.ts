import { takeSnapshot } from './snapshot'
import { compareVersions } from './compare'
import { buildMatrix } from './matrix'
import { check, snapshotVersion } from './check'

// NOTE: package.json scripts bake the command in (e.g. `bun ./src/index.ts snapshot`),
// and `bun run script <args>` appends user args after it.
const args = Bun.argv.slice(2)
const cmd = args[0]
const rest = args.slice(1)
const positional = rest.filter((a) => !a.startsWith('--'))
const hasFlag = (f: string) => rest.includes(f)

if (cmd === 'snapshot' && positional[0]) {
  await snapshotVersion(positional[0], hasFlag('--fetch'))
} else if (cmd === 'snapshot') {
  takeSnapshot()
} else if (cmd === 'compare' && positional[0] && positional[1]) {
  compareVersions(positional[0], positional[1])
} else if (cmd === 'matrix') {
  buildMatrix(positional[0])
} else if (cmd === 'check') {
  await check()
} else {
  console.log('usage: watch snapshot [version] [--fetch] | watch compare <a> <b> | watch matrix [version] | watch check')
  process.exit(1)
}

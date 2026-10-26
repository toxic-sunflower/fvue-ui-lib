# fvue-ui-lib (unofficial Vue port of `@fanvue/ui`)

Monorepo. Original tracked: `@fanvue/ui@3.43.0` (Apache-2.0).
Unofficial port, not affiliated with Fanvue.

## Structure

- `packages/ui` — `fvue-ui-lib`: 85 Vue 3 components, 176 icons, 69 animated icons
  (Vite lib, `.d.ts`, subpaths `charts/date-picker/flags/animated-icons`,
  `styles/components.css`, `theme.css` + `base.css` re-exported from `@fanvue/ui`, do not edit)
- `apps/docs` — VitePress showcase, 87 pages (`bun run docs:build`)
- `tools/upstream-watch` — snapshots + diff + correspondence matrix (`snapshots/`)
- `tools/icon-sync` — regenerates icons/flags from upstream sources
- `docs/` — `inventory.md`, `stage-2-divergence.md`, `STATUS.md`

## Commands (Bun)

```sh
bun install
bun run build        # ui (components + theme)
bun run typecheck
bun run test         # 98 unit tests
bun run docs:build
bun run test:visual  # 103 Playwright checks (screenshots + axe + keyboard)
bun run watch:check  # is upstream ahead of snapshots?
bun run watch:compare 3.42.2 3.43.0
bun run watch:matrix
```

Package docs: [`packages/ui/README.md`](./packages/ui/README.md).

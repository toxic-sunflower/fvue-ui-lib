# Contributing to fvue-ui-lib

Unofficial Vue 3 port of `@fanvue/ui`. Not affiliated with Fanvue.

## Doctrine: strict parity, nothing invented

We are a Vue copy of Fanvue's standard UI library. We follow upstream, we do not invent.

1. **Names 1:1 with upstream.** Component, prop, event, variant, subpath — exactly as in
   `@fanvue/ui`. Only technical Vue mapping is allowed (`children` → slots,
   controlled props → `v-model` + `defaultValue`, `onXxx` → `update:*` events).
2. **No invented entities** in the public API. Need something new? Check upstream first
   (including fresh releases via `bun run watch:check`). If upstream doesn't have it,
   it doesn't go into the library — keep it in your app.
3. **Collisions resolve in favour of upstream.** A contributed element whose name matches
   a standard one — including ones appearing in *future* upstream versions — is removed
   or renamed, with a breaking note in CHANGELOG. The upstream watcher (`compare`) is
   the early-warning system: when upstream adds a same-named component, an issue lands here.
4. **Visual/behaviour parity.** Any deliberate divergence is documented in
   `docs/stage-2-divergence.md`. Everything else is treated as a port bug.

## Gitflow

Branches: `main` (releases only, protected), `develop` (integration), `feature/*`,
`release/x.y.z` (stabilisation: version bump + CHANGELOG, feature freeze).

Flow: `feature/*` → PR into `develop` (green CI required) → `release/x.y.z` →
PR into `main` → tag `vX.Y.Z` → auto-publish via `release.yml`. Never commit
directly into `main`.

## Checks

- `bun run build`, `bun run typecheck`, `bun run test` (Vitest),
  `bun run docs:build`, `bun run test:visual` (Playwright, committed baselines).
- Visual baselines update only deliberately: `bunx playwright test --update-snapshots`,
  and the diff is reviewed in the PR.
- Never commit secrets. Tokens live in the maintainer's shell / repo secrets only.

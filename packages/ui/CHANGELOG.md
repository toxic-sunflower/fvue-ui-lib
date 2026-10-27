# Changelog

## 0.1.2

- Theme is vendored into the package: `theme.css`/`base.css` carry the real upstream content, so consumers no longer need `@fanvue/ui` installed (fixes `Can't resolve '@fanvue/ui/styles/theme.css'`). Resync with `bun run sync:theme` in `packages/ui`.

## 0.1.1

- Real CJS bundles (`require()` works) instead of ESM copies.
- Package metadata: repository/homepage/bugs links, LICENSE/NOTICE/README/CHANGELOG included.
- Clean install story in README (single `bun add`, no React leftovers).
- Toolchain runs on Bun only (`bunx --bun`), no Node required; theme merged into `fvue-ui-lib`.

## 0.1.0

First public snapshot of the unofficial Vue 3 port, tracking `@fanvue/ui@3.43.0`.

- 85/85 root components ported (see `tools/upstream-watch/matrix.md`).
- 176 static icons generated from upstream sources, 69 animated icons (CSS-driven),
  265 country flags (circle-flags artwork, MIT).
- Tokens re-exported from the original; light/dark themes via `.dark`.
- Consciously not ported: `Logo` (trademark).
- Known approximations: animated icon choreography, DatePicker (native inputs),
  Charts (chrome only), Table (presentational). See `docs/stage-2-divergence.md` (repo root).

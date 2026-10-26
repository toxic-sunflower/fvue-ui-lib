# Changelog

## Unreleased

First public snapshot of the unofficial Vue 3 port, tracking `@fanvue/ui@3.43.0`.

- 85/85 root components ported (see `tools/upstream-watch/matrix.md`).
- 176 static icons generated from upstream sources, 69 animated icons (CSS-driven),
  265 country flags (circle-flags artwork, MIT).
- Tokens re-exported from the original; light/dark themes via `.dark`.
- Consciously not ported: `Logo` (trademark).
- Known approximations: animated icon choreography, DatePicker (native inputs),
  Charts (chrome only), Table (presentational). See `docs/stage-2-divergence.md` (repo root).

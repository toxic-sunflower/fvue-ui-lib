# Status

Living summary of what is done, what is not verified, and what needs an owner decision.
Updated: 2026-10-26. Upstream tracked: `@fanvue/ui@3.43.0`.

## Done

- 85/85 root components ported (see `tools/upstream-watch/matrix.md`, baseline 3.43.0).
- 176 static icons generated from upstream sources, 69 animated icons (CSS-driven),
  265 country flags (circle-flags artwork, MIT).
- 98/98 unit tests (Vitest + happy-dom), `vue-tsc` clean, Vite lib build
  (ESM + CJS + `.d.ts` + `dist/fvue-ui-lib.css`).
- Docs app builds (87 pages with live demos); 87/87 Playwright screenshots;
  12/12 axe scans (7 findings are verified upstream parity, allowlisted in the spec);
  4/4 keyboard e2e (Tabs arrows, Dialog Esc, Select Enter, Checkbox Space).
- Button colors verified 1:1 against a live React render of the original (computed styles).
- Upstream watcher: snapshot / compare / matrix / check + daily CI workflow.
- License: Apache-2.0, NOTICE with attribution, no `Logo` port (trademark).

## Not done / not verified

- Cross-browser: only Chromium (+ headless shell) and Firefox (installed, not yet in CI matrix).
  WebKit not installed (heavy); screen readers not tested.
- Manual review of most visual baselines (only a handful inspected by a human:
  Button, ChatMessage, Table, Icons). Baselines are self-generated.
- Open overlay states are covered by e2e (Dialog/Drawer/Tooltip/Select/Toast open and work)
  but screenshots capture mostly closed states.
- Animated icons are a CSS approximation of the motion choreography (spring/coordinate
  animation does not transfer 1:1); 8 icons render statically (marked in code and showcase).
- DatePicker uses native date inputs (single/range), no calendar grid.
- Charts export the chrome only (container/card/legend/tooltip/skeleton) — no chart engine;
  consumers render their own charts.
- Table is a presentational compound (no virtualization, drag-and-drop, advanced cells).
- ChatInput/Audio* have no real recording/sending (events only).
- Watcher limitations: complex TS types stored as text; internal changes with no
  `.d.ts`/token footprint are invisible to the diff; CI workflow never ran (no repo yet).
- `__dirname` warning in `packages/ui/vite.config.ts` (cosmetic; migrate to `import.meta.dirname`).

## Owner decisions pending

1. Publish? If yes: exact npm name (proposal: `fvue-ui-lib`) and version (`0.1.0`?).
2. Port repo URL for `repository`/`bugs`/`homepage` in `package.json`.
3. Keep or drop CJS duplicates and sourcemaps in the published package.
4. Confirm Apache-2.0 for the port's own code.
5. Keep all historical upstream snapshots in `tools/upstream-watch/snapshots/`
   (currently 4, ~1.3 MB) or only the last N.

# Divergence report vs `@fanvue/ui@3.43.0`

Honest status: pixel-by-pixel comparison with the React original is **not automated**
(no Node/React environment here; the original's Chromatic stories are opened manually).
Done: 98 unit tests, 87 screenshot baselines of our own showcase, manual review of
Button, ChatMessage, Table and Icons. Remaining screenshots are baselines without
hand-checking every pixel.

## Verified

- Props/value names 1:1 with the original docs (Button's 12 variants, sizes 24/32/40/48,
  Select size/variant, Dialog size/mobilePresentation, ChatMessage user/variant/status).
- **Button colors verified 1:1 against the React original** (live 3.43.0 render +
  computed styles, 11 light variants + dark primary): exact match, including dark
  primary (white background + dark text) and tertiaryDestructive.
- Sender bubble: dark text on light green (as in the original); negative buttons:
  fixed dark text (as in the original — nearly invisible on dark backgrounds;
  that's an upstream quirk, not our bug).
- Vue mapping: `children` → slots, controlled → `v-model` + `defaultValue`,
  `update:*` events. Boolean props of Reka wrappers don't cast `undefined` to `false`
  (explicit `default: undefined`, otherwise uncontrolled mode broke).
- a11y: roles/states from Reka (role=switch/tab/dialog/status, aria-busy/invalid,
  label↔input links, focus trap/ESC in Dialog/Drawer). Tabs keyboard — focus activation
  like the original (mousedown also switches).
- Tokens: only the original's variables (`--color-buttons-*`, `--color-messages-*`,
  `--color-modal-*`, etc.), `.dark` theme, `prefers-reduced-motion` respected.
- Overlays portal to `body`, z-index from `--fanvue-ui-portal-z-index`.
- axe gate: 12 pages clean; 7 findings are verified upstream parity
  (destructive/tertiaryDestructive/negative/error text/alerts — same tokens and
  colors as the original, checked against the reference render), documented as an
  allowlist in `apps/docs/visual/a11y.spec.ts`. New findings fail CI.

## Conscious differences (by component)

- **Button**: 12px radius (exact original value not verified); no `asChild`
  (slots instead); `white` is nearly invisible on light backgrounds — by design.
- **TextField**: no clear button, side label, or action slot (the original has them).
- **Select**: no `aria-label/aria-labelledby` props (label is linked internally instead);
  item size doesn't inherit from the parent automatically; `filled` only changes the surface.
- **Checkbox**: `indeterminate` state passes through, visuals not verified.
- **Switch**: single size.
- **Dialog**: no drag-to-dismiss sheet and no `overlayProps`; `portal=false` untested;
  outside-click close is Reka's default.
- **Drawer**: simplified API (slots instead of parts), right/left only, no menu variant or drag.
- **Tooltip**: only `side`+`align` (no MUI-style 12-position `placement`).
- **Tabs**: static underline indicator (no sliding animation or post-font-load measurement);
  no overflow menu; flushLeft/scrollable are classes only.
- **Toast**: custom `useToast` instead of the controlled Root API; no swipe; viewport bottom only.
- **Avatar**: numeric size (original scale not verified); no platinum border.
- **Badge**: variant/size names assumed (neutral/brand/success/warning/error/info, sm/md).
- **Loader**: custom SVG spinner (not SpinnerIcon).
- **ChatMessage**: display only (no real audio — same as the original, which has no `src` either);
  waveform placeholder is a row of dots.
- **Table**: presentational compound (no virtualization, drag-and-drop, advanced cells).
- **Charts**: chrome only (container/card/legend/tooltip/skeleton) — no chart engine;
  consumers render their own charts.
- **DatePicker**: native date inputs (single/range), no calendar grid.
- **Animated icons**: CSS approximation of the motion choreography; 8 icons render statically.
- **Logo**: intentionally not ported (trademark).

## Showcase limitations

- Screenshots of Dialog/Drawer/Tooltip/Select/Toast show the closed state
  (open overlays are not in frame — needs a dedicated scenario).
- Inter is substituted with a system font in headless environments (text geometry ±).
- Comparison with the Chromatic original is manual via doc links (an automated
  two-environment diff is a watcher task).

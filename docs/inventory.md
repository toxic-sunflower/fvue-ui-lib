# Stage 0 — Recon of `@fanvue/ui` (snapshot 2026-10-25)

Source: `@fanvue/ui@3.43.0`, docs at `api.fanvue.com/docs/ui`, repo `github.com/fanvue/fanv-ui`, npm tarball.
Verified by reading only (bun info, fetch, dist unpack). No port code written at this stage.

## 1. What it is

- React 18/19 only, Apache-2.0 © Shift Holdings Ltd. `LICENSE` ships in the package. No `NOTICE` file in package or repo.
- `THIRD-PARTY-NOTICES.md` ships in the package: animated icons — lucide-animated (MIT) → Lucide (ISC) → partly Feather (MIT). Account for this in the port.
- Entry points (verified via package.json `exports`): `.`, `./charts`, `./date-picker`, `./flags`, `./animated-icons`, `./styles/*`. No duplication: Chart/DatePicker/Flag live only on their subpaths.
- No compiled styles. Only Tailwind v4 source: `dist/styles/theme.css` (pulls in `base.css`). Consumers must add `@source ../node_modules/@fanvue/ui` and `tw-animate-css` for overlays.
- Theme: `.dark` class on an ancestor + `color-scheme`. Tokens are CSS variables with light/dark pairs. The `dark:` variant is redefined to the class, breakpoints are replaced (sm 850 / md 1024 / lg 1280, no xl/2xl), radii/shadows redefined, spacing untouched.
- Color tokens: 291 `--color-*` (counted in theme.css). Families: content/background/surface/border/brand/success/warning/error/info/neutral-alphas + component families (`buttons/inputs/icons/alerts/badges/messages/modal/tab/progress/creator/interaction/special`) + `primitives-*`. Plus `--radius-*`, `--shadow-*` (incl. `--fv-focus-ring-color`), `--breakpoint-*`, `--opacity-disabled`, `--fanvue-ui-portal-z-index: 50`. Typography — 16 `typography-*` utilities + `typography-medium-caption-xs`.
- Component docs are generated from sources: props from TS types + JSDoc (Button/Select/Dialog examples below). Guides are hand-written. Storybook (Chromatic) + Vitest + Playwright e2e + size-limit (root 220 KB, animated-icons 15 KB).
- Peers: `react+react-dom ^18||^19`, `tailwindcss ^4`, `@radix-ui/react-slot ^1.2`. Optional: `recharts ^3` (charts), `react-day-picker ^9` (date-picker), `motion ^12||^13` (animated-icons).
- Deps (bundled): Radix accordion/avatar/checkbox/dialog/dropdown-menu/popover/radio-group/select/separator/slider/switch/tabs/toast/tooltip + use-controllable-state, `clsx+tailwind-merge` (`cn` re-exported), `Slot/Slottable` re-exported from the root.

## 2. Versioning and releases (verified)

- Tags `ui-vX.Y.Z` (`git ls-remote`: v1.0.0 … v3.43.0). Releases via release-please (conventional commits: feat/fix/perf), `CHANGELOG.md` auto-generated with issue/commit links.
- Past breaking changes: v2.0.0 (tokens v2), v3.0.0 (tokens v3 — renamed CSS variables, Tailwind and typography classes + value changes), v1.1.0 (variants to camelCase). Takeaway: tokens break on majors, props change often on minors/fixes (see changelog 3.24–3.43: Tabs/Select/Dialog/DropdownMenu/Alert/ChatEmbed).
- Cadence: dozens of releases per month (almost weekly in Sep–Oct 2026). Track via tags + `.d.ts` + `theme.css` diffs.
- Watcher inputs: `dist/index.d.ts`, `dist/{charts,date-picker,flags,animated-icons}.d.ts`, `dist/styles/theme.css`, `package.json` (exports/peer), `CHANGELOG.md`.

## 3. Inventory (summary)

Full page list: `llms.txt` (~90). `dist/index.d.ts` has 346 `export const` (components + subparts + icons). Excluding `*Icon` and subparts — ~60 root entities + charts/flags separately. The "82 components" vs ~90 pages mismatch — count via `llms.txt`/`.d.ts`, not the marketing number. Icons: docs claim 172 static / 69 animated / 265 flags; `.d.ts` mentions 176 Icon names — verified by script in Stage 3 (176 static).

| Group | Components (root) | Radix / complexity | States/events, a11y | Tokens/animations |
|---|---|---|---|---|
| Actions | Button, IconButton, AiButton, SubscribeButton, SwitchButton, FloatingActionButton, ButtonStack, ButtonIconGroup, Link | Slot `asChild`; AiButton — shimmer/sheen, `prefers-reduced-motion` | variant/size/loading/disabled/negative/fullWidth/price/discount; `onClick`; focus ring | `buttons/*`, `brand/*`, `focus-ring`; AiButton utility `fv-ai-button` in base.css |
| Forms | TextField, TextArea, SearchField, PasswordField, PhoneField, Select, Autocomplete, Checkbox, Radio/RadioGroup, Switch/SwitchField/SwitchToggle, Slider, InlineEdit | Select/Checkbox/Radio/Switch/Slider — Radix; Autocomplete — Radix Select/Popover + portals; PhoneField — flag + dial code | label/helper/error, controlled/uncontrolled (`value/defaultValue`, `onValueChange`), `v-model` in the port; keyboard/focus from Radix | `inputs/*`, `border-*`, error tokens; overlay animations via tw-animate-css |
| Overlays | Dialog, Drawer, DropdownMenu, Tooltip (+TooltipLabel), InfoBox | Dialog/Dropdown/Tooltip — Radix + portal to body; Dialog — bottom sheet on mobile, drag-to-dismiss, `portal/overlayProps/mobilePresentation/size` | focus trap, ESC, `open/onOpenChange`; trigger suppresses click after scroll-drag (Android) | `--fanvue-ui-portal-z-index`, `modal/*`; enter/exit `animate-in/out` |
| Navigation | Tabs (+TabsOverflow), Breadcrumb, Pagination, PageSelector, Stepper, MobileStepper, SegmentedControl, BottomNavigation | Tabs — Radix + animated indicator (measured after fonts load) | `value/defaultValue`, fullWidth/flushLeft/scrollable, overflow menu | `tab/*`, `background-*` |
| Data | Table (Card/ScrollArea/Toolbar/Header/Row/Cell/Pagination + cell parts, MobileRow), Accordion, Chart (subpath), Demographics, RatingSummary, AnimatedNumber, CyclingText, Count, Chip, Pill | Table — biggest (sorting, pagination, condensed, mobile-row); Chart — Recharts wrapper (`ChartContainer/Tooltip/Legend/Card/Skeleton`) | controlled sorting/pages; `prefers-reduced-motion` for AnimatedNumber/CyclingText | `special-chart-*`, `surface/*`; skeletons |
| Feedback | Alert, Badge, Banner, CriticalBanner, EmptyState, Loader, ProgressBar, Skeleton, Snackbar, Toast | Toast — Radix Toast + bottom viewport; Alert — CTA slots | `open/duration/onClose`, action buttons; aria-live for Toast/Snackbar | `alerts-*`, `badges-*`, status tokens |
| Layout | Card, Divider | simple | header/content/footer slots | `surface/*`, `border-primary` |
| Media/Audio | AudioPlayer, AudioRecordButton, AudioUpload, VoiceNote, MediaStatusIndicator | Waveform (0–1 array), optional real audio; recording via MediaRecorder | `playing/defaultPlaying/onPlayingChange`, durations/timestamps | fixed timer width so waveform never reflows |
| Creator/Social | Avatar, ChatMessage, ChatInput, ChatEmbed (+LiveStatus), CreatorCard/Cover/Tile, UserItem/DisplayName/Handle, FanFollowerCount, ProfileStatus/OnlineStatus, ReviewCard | ChatMessage: text/audio/typing/deleted, delivered/read ticks, avatars; ChatInput: toolbar + attach + select | `user sender/receiver`, `status`, `time`, `waveform`; accessible play/pause/typing names | `messages/*`, `creator/*`; NSFW blur on Avatar |
| Icons/Flags | 176 static (size 16/24/32, filled/outlined), 69 animated (stroke-only, `controlRef`, reduced-motion), CountryFlag 265 codes (inline SVG, `country/size/label`) | Animated — `motion` peer; Flag — generated SVG table (~167 KB, separate chunk) | `size/filled`, `controlRef start/stopAnimation`; Flag: unknown code → grey `xx` | separate subpaths, size budgets |
| Utility | Logo (brand + 3D + agencies), `cn`, `Slot/Slottable`, `getInitials`, `useSuppressClickAfterDrag` | Logo is a trademark — not ported | — | — |

Prop examples (confirm JSDoc generation): Button (12 variants, size 24/32/40/48, leftIcon/rightIcon, loading, negative, price/discount, asChild), Select (label/helper/error, size 32/40/48, variant default/filled, SelectItem avatar/description/leadingIcon), Dialog (size sm/md/lg, mobilePresentation sheet/card, portal, overlayProps), ChatMessage (user/variant/status/time/waveform/playing). Full tables come from machine-parsing `.d.ts` in the watcher.

## 4. Vue foundation

- **Reka UI 2.11.0** (verified by install): Accordion, Dialog, DropdownMenu, Popover, Select, Tabs, Toast, Tooltip, Checkbox, RadioGroup, Switch, Slider, Avatar, Separator, Combobox (for Autocomplete), Drawer, Progress, Toggle. Covers every Radix dependency of the original. Vue 3, headless, a11y/focus/keyboard out of the box.
- Alternatives: `radix-vue 1.9.17` — Reka's old name, don't use; Ark UI Vue — good but API is further from Radix (more mapping); Headless UI Vue — too few primitives (no Toast/Slider/Tooltip). Verdict: Reka is the 1:1 counterpart.
- React→Vue mapping: `children` → slots, `asChild/Slot` → slot + `as`/`inheritAttrs`, controlled (`value/onChange`) → `v-model` (`modelValue/update:modelValue` + `defaultValue` for uncontrolled), `forwardRef` → `useTemplateRef/defineExpose`, portals → `<Teleport to="body">`, `className+cn` → `class + cn()`.
- Tokens are used as-is: `@import "@fanvue/ui/styles/theme.css"` — generated from the original, never hand-copied (do-not-edit file, generated by `build:dictionary` from Figma).

## 5. Risks

1. Frequent releases (tokens + props change) — without a watcher the port rots within weeks.
2. `Logo` and the Fanvue brand are trademarks; excluded from the port, README says "unofficial".
3. Animated icons/flags carry third-party licenses (MIT/ISC/Feather) + weight; subpaths only + `THIRD-PARTY-NOTICES`.
4. Internal Radix classes/`data-*` are not public API — never target them with selectors.
5. Breakpoints/dark theme override the consumer's Tailwind — documented.
6. Complex parts: Table, ChatInput/ChatMessage, Audio/Waveform, Dialog sheet + drag, Tabs indicator, DropdownMenu reorder/dnd.
7. Figma is the source of icons/tokens (`icons:sync`); without access, only dist diffs.

## 6. Effort estimate (rough, by group)

Tokens/theme/scaffold: S. Button/badge/avatar primitives: S–M. Forms: M. Overlays: M–L. Table/Charts/DatePicker: L. Creator/Media: L. Icons/flags (generation): M (automatable).

## 7. Port status (updated)

All 85 root components ported (see `tools/upstream-watch/matrix.md`, baseline 3.43.0).
Order followed: tokens → Button, IconButton, Badge, Chip, Avatar, Loader, Tooltip, Switch, Checkbox, TextField → Select, Dialog, Drawer, Tabs, Toast → everything else.

## 8. Not verified at recon time

Full `.d.ts` line by line, visual rendering, flag licenses separately, Figma access, `CONTRIBUTING`/`SECURITY` terms (skimmed: Conventional Commits + release-please). Before publishing: read LICENSE/THIRD-PARTY/CONTRIBUTING in full; trademarks noted to the owner.

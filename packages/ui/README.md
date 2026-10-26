# fvue-ui-lib

Unofficial Vue 3 port of [`@fanvue/ui`](https://www.npmjs.com/package/@fanvue/ui) (Apache-2.0).
**Not affiliated with or endorsed by Fanvue.**

Fanvue's own interface is built with the open-source React library `@fanvue/ui`.
This package brings the same look, tokens, and dark mode to **Vue 3 + TypeScript +
Vite + Tailwind CSS v4** apps — embedded Fanvue Apps or standalone.

- 85 components, 176 static icons, 69 animated icons, 265 country flags
- Design tokens as a Tailwind v4 theme (re-exported from the original, not vendored)
- Light/dark themes via a single `.dark` class
- Accessible primitives via [Reka UI](https://reka-ui.com/) (the Vue counterpart of Radix UI)
- Tree-shakeable named exports, same subpaths as the original

## Install

```sh
bun add fvue-ui-lib vue tailwindcss reka-ui
# only if you use them:
bun add recharts        # charts (bring your own renderer, chrome is included)
bun add react-day-picker # NOT needed — DatePicker is native
bun add motion           # NOT needed — animated icons are CSS-driven
```

Peer dependencies: `vue ^3.5.0`, `tailwindcss ^4.0.0`. Runtime dependency: `reka-ui`.

## Tailwind v4 setup

The library ships class names, not compiled CSS. Your Tailwind build produces the styles:

```css
/* app.css */
@import "tailwindcss";
@source "../node_modules/fvue-ui-lib";
@import "fvue-ui-lib/styles/components.css";
@import "fvue-ui-lib/theme.css"; /* design tokens (variables + .dark), re-exported from @fanvue/ui */
```

> Without the `@source` line Tailwind never sees the classes and everything renders unstyled.

## Dark mode

```ts
// follow the OS, or wire your own toggle
const root = document.documentElement
root.classList.toggle('dark', matchMedia('(prefers-color-scheme: dark)').matches)
root.style.colorScheme = root.classList.contains('dark') ? 'dark' : 'light'
```

## Usage

```vue
<script setup>
import { Button, TextField, Dialog, DialogContent, DialogTrigger } from 'fvue-ui-lib'
import { ref } from 'vue'

const name = ref('')
const open = ref(false)
</script>

<template>
  <TextField v-model="name" label="Name" placeholder="Ada Lovelace" />
  <Dialog v-model:open="open">
    <DialogTrigger>
      <Button>Greet</Button>
    </DialogTrigger>
    <DialogContent>
      Hello, {{ name || 'stranger' }}!
    </DialogContent>
  </Dialog>
</template>
```

Subpaths mirror the original:

```ts
import { ChartContainer } from 'fvue-ui-lib/charts'
import { DatePicker } from 'fvue-ui-lib/date-picker'
import { CountryFlag } from 'fvue-ui-lib/flags'
import { HeartIcon } from 'fvue-ui-lib/animated-icons'
```

## Embedded Fanvue App example

```vue
<script setup>
import { Button, Toast, useToast } from 'fvue-ui-lib'
import { onMounted } from 'vue'

const { push } = useToast()

// Fanvue purchase bridge: purchaseResult is a UI hint, NOT payment confirmation.
// Always reconcile on your backend via webhooks before granting anything.
window.addEventListener('message', (e) => {
  if (e.data?.type === 'purchaseResult' && e.data.ok) push({ title: 'Noted', description: 'Confirming on server…' })
})

onMounted(() => document.documentElement.classList.add('dark'))
</script>

<template>
  <Toast>
    <Button variant="brand">Buy credits</Button>
  </Toast>
</template>
```

## Porting notes (vs `@fanvue/ui@3.43.0`)

- `children` → slots; controlled props → `v-model` + `defaultValue` for uncontrolled;
  `onXxx` callbacks → `update:*` events.
- Radix UI → Reka UI (same primitives family, same keyboard/focus behaviour).
- `asChild` is not supported — compose with slots instead.
- Animated icons are CSS-driven (hover / `playing` prop / exposed `startAnimation`/`stopAnimation`);
  8 icons render statically (see vitrine).
- DatePicker uses native date inputs (single/range), no calendar grid yet.
- Charts export the chrome (container/card/legend/tooltip/skeleton) — bring your own renderer.
- `Logo` is intentionally not ported (trademark).
- See [divergence report](../../docs/stage-2-divergence.md) for the full list of conscious differences.

## License & attribution

Apache-2.0. See [LICENSE](./LICENSE), [NOTICE](./NOTICE) (attributes Shift Holdings Ltd / Fanvue),
and [THIRD-PARTY-NOTICES.md](https://github.com/fanvue/fanv-ui/blob/main/THIRD-PARTY-NOTICES.md)
in the original repo (lucide-animated MIT, Lucide ISC, Feather MIT, circle-flags MIT).

Original library: https://github.com/fanvue/fanv-ui — docs: https://api.fanvue.com/docs/ui.
File issues about the *original* there, not here.

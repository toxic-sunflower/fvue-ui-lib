<script setup lang="ts">
import { computed } from 'vue'
import type { IconSize } from '../types'

const props = withDefaults(defineProps<{ size?: IconSize; filled?: boolean }>(), {
  size: 24,
  filled: false,
})

const VARIANTS = {"16":{"outlined":[{"d":"m10.813 2.58-2 3.613c-.2.367-.027.82.367.953l2.746.934c.454.153.6.72.287 1.073l-4.56 5.134c-.247.28-.7.066-.653-.3l.506-3.527a.666.666 0 0 0-.433-.72L4.066 8.666a.664.664 0 0 1-.366-.933L6.646 1.96a.67.67 0 0 1 .594-.367h3c.5-.007.82.54.573.987Z"}],"filled":[{"d":"m10.813 2.58-2 3.613c-.2.367-.026.82.367.953l2.747.934c.453.153.6.72.286 1.073l-4.56 5.134c-.246.28-.7.066-.653-.3l.507-3.527a.666.666 0 0 0-.434-.72L4.067 8.666a.664.664 0 0 1-.367-.933L6.647 1.96a.67.67 0 0 1 .593-.367h3c.5-.007.82.54.573.987"}]},"24":{"outlined":[{"d":"m16.22 3.87-3 5.42c-.3.55-.04 1.23.55 1.43l4.12 1.4c.68.23.9 1.08.43 1.61l-6.84 7.7c-.37.42-1.05.1-.98-.45l.76-5.29a1 1 0 0 0-.65-1.08L6.1 13a.995.995 0 0 1-.55-1.4l4.42-8.66c.17-.33.51-.55.89-.55h4.5c.75-.01 1.23.81.86 1.48Z","sw":1.5}],"filled":[{"d":"m16.22 3.87-3 5.42c-.3.55-.04 1.23.55 1.43l4.12 1.4c.68.23.9 1.08.43 1.61l-6.84 7.7c-.37.42-1.05.1-.98-.45l.76-5.29a1 1 0 0 0-.65-1.08L6.1 13a.995.995 0 0 1-.55-1.4l4.42-8.66c.17-.33.51-.55.89-.55h4.5c.75-.01 1.23.81.86 1.48"}]},"32":{"outlined":[{"d":"m21.627 5.16-4 7.226a1.33 1.33 0 0 0 .733 1.907l5.493 1.867c.907.306 1.2 1.44.573 2.146l-9.12 10.267c-.493.56-1.4.133-1.306-.6l1.013-7.053a1.33 1.33 0 0 0-.867-1.44l-6.013-2.147a1.327 1.327 0 0 1-.733-1.867L13.293 3.92c.227-.44.68-.734 1.187-.734h6c1-.013 1.64 1.08 1.146 1.974Z","sw":2}],"filled":[{"d":"m21.627 5.16-4 7.226a1.33 1.33 0 0 0 .733 1.907l5.494 1.867c.906.306 1.2 1.44.573 2.146l-9.12 10.267c-.494.56-1.4.133-1.307-.6l1.014-7.053a1.33 1.33 0 0 0-.867-1.44l-6.014-2.147a1.327 1.327 0 0 1-.733-1.867L13.293 3.92c.227-.44.68-.734 1.187-.734h6c1-.013 1.64 1.08 1.147 1.974"}]}} as Record<number, { outlined: { d: string; sw?: number; eo?: boolean }[]; filled?: { d: string; sw?: number; eo?: boolean }[] }>

const current = computed(() => VARIANTS[props.size] ?? VARIANTS[24])
const showFilled = computed(() => !!(props.filled && current.value?.filled))
</script>

<template>
  <svg :viewBox="`0 0 ${size} ${size}`" :width="size" :height="size" fill="none" aria-hidden="true" class="fvue-icon">
    <g :class="['fvue-icon__layer', showFilled && 'fvue-icon__layer--hidden']">
      <path
        v-for="p in current?.outlined ?? []"
        :key="p.d"
        :d="p.d"
        :stroke="p.sw !== undefined ? 'currentColor' : undefined"
        :stroke-width="p.sw"
        stroke-linecap="round"
        stroke-linejoin="round"
        :fill="p.sw !== undefined ? undefined : 'currentColor'"
        :fill-rule="p.eo ? 'evenodd' : undefined"
        :clip-rule="p.eo ? 'evenodd' : undefined"
      />
    </g>
    <g v-if="current?.filled" :class="['fvue-icon__layer', showFilled ? undefined : 'fvue-icon__layer--hidden']">
      <path
        v-for="p in current.filled ?? []"
        :key="p.d"
        :d="p.d"
        :stroke="p.sw !== undefined ? 'currentColor' : undefined"
        :stroke-width="p.sw"
        stroke-linecap="round"
        stroke-linejoin="round"
        :fill="p.sw !== undefined ? undefined : 'currentColor'"
        :fill-rule="p.eo ? 'evenodd' : undefined"
        :clip-rule="p.eo ? 'evenodd' : undefined"
      />
    </g>
  </svg>
</template>

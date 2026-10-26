<script setup lang="ts">
import { computed } from 'vue'
import type { IconSize } from '../types'

const props = withDefaults(defineProps<{ size?: IconSize; filled?: boolean }>(), {
  size: 24,
  filled: false,
})

const VARIANTS = {"16":{"outlined":[{"d":"M7 3.333a1 1 0 1 0 2 0 1 1 0 1 0-2 0M7 8a1 1 0 1 0 2 0 1 1 0 1 0-2 0m0 4.667a1 1 0 1 0 2 0 1 1 0 1 0-2 0"}]},"24":{"outlined":[{"d":"M10.5 5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0m0 7a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0m0 7a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"}]},"32":{"outlined":[{"d":"M14 6.667a2 2 0 1 0 4 0 2 2 0 1 0-4 0M14 16a2 2 0 1 0 4 0 2 2 0 1 0-4 0m0 9.333a2 2 0 1 0 4 0 2 2 0 1 0-4 0"}]}} as Record<number, { outlined: { d: string; sw?: number; eo?: boolean }[]; filled?: { d: string; sw?: number; eo?: boolean }[] }>

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

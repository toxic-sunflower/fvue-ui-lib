<script setup lang="ts">
import { computed } from 'vue'
import type { IconSize } from '../types'

const props = withDefaults(defineProps<{ size?: IconSize; filled?: boolean }>(), {
  size: 24,
  filled: false,
})

const VARIANTS = {"16":{"outlined":[{"d":"M12.667 7a1 1 0 1 0 0 2 1 1 0 1 0 0-2M8 7a1 1 0 1 0 0 2 1 1 0 1 0 0-2M3.333 7a1 1 0 1 0 0 2 1 1 0 1 0 0-2"}]},"24":{"outlined":[{"d":"M19 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3m-7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3m-7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3"}]},"32":{"outlined":[{"d":"M25.333 14a2 2 0 1 0 0 4 2 2 0 1 0 0-4M16 14a2 2 0 1 0 0 4 2 2 0 1 0 0-4m-9.333 0a2 2 0 1 0 0 4 2 2 0 1 0 0-4"}]}} as Record<number, { outlined: { d: string; sw?: number; eo?: boolean }[]; filled?: { d: string; sw?: number; eo?: boolean }[] }>

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

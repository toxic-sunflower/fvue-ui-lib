<script setup lang="ts">
import { computed } from 'vue'
import type { IconSize } from '../types'

const props = withDefaults(defineProps<{ size?: IconSize; filled?: boolean }>(), {
  size: 24,
  filled: false,
})

const VARIANTS = {"16":{"outlined":[{"d":"M5.334 7.667 8.667 11 15 4.667m-13.666 3L4.667 11l1-1M11 4.667 7.834 7.833"}],"filled":[{"d":"M5.333 7.667 8.667 11 15 4.667m-13.667 3L4.667 11l1-1M11 4.667 7.833 7.833"}]},"24":{"outlined":[{"d":"m8 11.5 5 5L22.5 7M2 11.5l5 5L8.5 15m8-8-4.75 4.75","sw":1.5}]},"32":{"outlined":[{"d":"M10.667 15.333 17.333 22 30 9.333m-27.333 6L9.333 22l2-2M22 9.333l-6.333 6.334","sw":2}]}} as Record<number, { outlined: { d: string; sw?: number; eo?: boolean }[]; filled?: { d: string; sw?: number; eo?: boolean }[] }>

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

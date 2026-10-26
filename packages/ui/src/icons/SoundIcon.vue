<script setup lang="ts">
import { computed } from 'vue'
import type { IconSize } from '../types'

const props = withDefaults(defineProps<{ size?: IconSize; filled?: boolean }>(), {
  size: 24,
  filled: false,
})

const VARIANTS = {"16":{"outlined":[{"d":"M2 11.167a.504.504 0 0 1-.5-.5V5.333c0-.273.227-.5.5-.5s.5.227.5.5v5.334c0 .273-.227.5-.5.5m3 2.666a.504.504 0 0 1-.5-.5V2.667c0-.274.227-.5.5-.5s.5.226.5.5v10.666c0 .274-.227.5-.5.5M8 10.5a.504.504 0 0 1-.5-.5V6c0-.273.227-.5.5-.5s.5.227.5.5v4c0 .273-.227.5-.5.5m3 2a.504.504 0 0 1-.5-.5V4c0-.273.227-.5.5-.5s.5.227.5.5v8c0 .273-.227.5-.5.5m3-2.667a.504.504 0 0 1-.5-.5V6.667c0-.274.227-.5.5-.5s.5.226.5.5v2.666c0 .274-.227.5-.5.5"}]},"24":{"outlined":[{"d":"M6 15.167a.504.504 0 0 1-.5-.5V9.333c0-.273.227-.5.5-.5s.5.227.5.5v5.334c0 .273-.227.5-.5.5m3 2.666a.504.504 0 0 1-.5-.5V6.667c0-.274.227-.5.5-.5s.5.226.5.5v10.666c0 .274-.227.5-.5.5m3-3.333a.504.504 0 0 1-.5-.5v-4c0-.273.227-.5.5-.5s.5.227.5.5v4c0 .273-.227.5-.5.5m3 2a.504.504 0 0 1-.5-.5V8c0-.273.227-.5.5-.5s.5.227.5.5v8c0 .273-.227.5-.5.5m3-2.667a.504.504 0 0 1-.5-.5v-2.666c0-.274.227-.5.5-.5s.5.226.5.5v2.666c0 .274-.227.5-.5.5"}]},"32":{"outlined":[{"d":"M4 22.333c-.547 0-1-.453-1-1V10.667c0-.547.453-1 1-1s1 .453 1 1v10.666c0 .547-.453 1-1 1m6 5.334c-.547 0-1-.454-1-1V5.333c0-.546.453-1 1-1s1 .454 1 1v21.334c0 .546-.453 1-1 1M16 21c-.547 0-1-.453-1-1v-8c0-.547.453-1 1-1s1 .453 1 1v8c0 .547-.453 1-1 1m6 4c-.547 0-1-.453-1-1V8c0-.547.453-1 1-1s1 .453 1 1v16c0 .547-.453 1-1 1m6-5.333c-.547 0-1-.454-1-1v-5.334c0-.546.453-1 1-1s1 .454 1 1v5.334c0 .546-.453 1-1 1"}]}} as Record<number, { outlined: { d: string; sw?: number; eo?: boolean }[]; filled?: { d: string; sw?: number; eo?: boolean }[] }>

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

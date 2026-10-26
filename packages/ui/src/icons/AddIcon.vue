<script setup lang="ts">
import { computed } from 'vue'
import type { IconSize } from '../types'

const props = withDefaults(defineProps<{ size?: IconSize; filled?: boolean }>(), {
  size: 24,
  filled: false,
})

const VARIANTS = {"16":{"outlined":[{"d":"M13.333 8.667H2.667A.67.67 0 0 1 2 8c0-.364.302-.667.667-.667h10.666c.365 0 .667.303.667.667a.67.67 0 0 1-.667.667"},{"d":"M8 14a.67.67 0 0 1-.667-.667V2.667C7.333 2.302 7.635 2 8 2c.364 0 .667.302.667.667v10.666A.67.67 0 0 1 8 14"}]},"24":{"outlined":[{"d":"M18.222 12.778H5.778A.783.783 0 0 1 5 12c0-.425.353-.778.778-.778h12.444c.425 0 .778.353.778.778a.783.783 0 0 1-.778.778"},{"d":"M12 19a.783.783 0 0 1-.778-.778V5.778c0-.425.353-.778.778-.778s.778.353.778.778v12.444A.783.783 0 0 1 12 19"}]},"32":{"outlined":[{"d":"M24 17H8c-.547 0-1-.453-1-1s.453-1 1-1h16c.547 0 1 .453 1 1s-.453 1-1 1"},{"d":"M16 25c-.547 0-1-.453-1-1V8c0-.547.453-1 1-1s1 .453 1 1v16c0 .547-.453 1-1 1"}]}} as Record<number, { outlined: { d: string; sw?: number; eo?: boolean }[]; filled?: { d: string; sw?: number; eo?: boolean }[] }>

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

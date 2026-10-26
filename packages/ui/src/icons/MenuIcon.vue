<script setup lang="ts">
import { computed } from 'vue'
import type { IconSize } from '../types'

const props = withDefaults(defineProps<{ size?: IconSize; filled?: boolean }>(), {
  size: 24,
  filled: false,
})

const VARIANTS = {"16":{"outlined":[{"d":"M14 5.167H2a.504.504 0 0 1-.5-.5c0-.274.227-.5.5-.5h12c.273 0 .5.226.5.5 0 .273-.227.5-.5.5M14 8.5H2a.504.504 0 0 1-.5-.5c0-.273.227-.5.5-.5h12c.273 0 .5.227.5.5s-.227.5-.5.5m0 3.333H2a.504.504 0 0 1-.5-.5c0-.273.227-.5.5-.5h12c.273 0 .5.227.5.5 0 .274-.227.5-.5.5"}]},"24":{"outlined":[{"d":"M21 7.75H3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h18c.41 0 .75.34.75.75s-.34.75-.75.75m0 5H3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h18c.41 0 .75.34.75.75s-.34.75-.75.75m0 5H3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h18c.41 0 .75.34.75.75s-.34.75-.75.75"}]},"32":{"outlined":[{"d":"M28 10.333H4c-.547 0-1-.453-1-1s.453-1 1-1h24c.547 0 1 .454 1 1 0 .547-.453 1-1 1M28 17H4c-.547 0-1-.453-1-1s.453-1 1-1h24c.547 0 1 .453 1 1s-.453 1-1 1m0 6.667H4c-.547 0-1-.454-1-1 0-.547.453-1 1-1h24c.547 0 1 .453 1 1s-.453 1-1 1"}]}} as Record<number, { outlined: { d: string; sw?: number; eo?: boolean }[]; filled?: { d: string; sw?: number; eo?: boolean }[] }>

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

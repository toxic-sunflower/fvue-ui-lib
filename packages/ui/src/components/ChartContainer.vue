<script setup lang="ts">
import { computed, provide } from 'vue'
import type { ChartConfig } from '../types'

export type { ChartConfig }

const props = withDefaults(
  defineProps<{
    config?: ChartConfig
    title?: string
  }>(),
  { config: () => ({}) },
)

provide('fvue-chart-config', computed(() => props.config))

const styleVars = computed(() => {
  const vars: Record<string, string> = {}
  for (const [key, entry] of Object.entries(props.config)) {
    if (entry.color) vars[`--color-${key}`] = entry.color
  }
  return vars
})
</script>

<template>
  <div class="fvue-chart" :style="styleVars">
    <slot />
  </div>
</template>

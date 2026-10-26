<script setup lang="ts">
import { computed } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'

const props = withDefaults(
  defineProps<{
    modelValue?: number | null
    max?: number
    title?: string
    helperText?: string
    stepped?: boolean
    steps?: number
  }>(),
  { max: 100, stepped: false },
)

const pct = computed(() => {
  if (props.modelValue == null) return null
  return Math.min(100, Math.max(0, (props.modelValue / props.max) * 100))
})
</script>

<template>
  <div class="fvue-progress">
    <div v-if="title" class="fvue-progress__head">
      <span class="fvue-field__label">{{ title }}</span>
      <span v-if="pct !== null" class="fvue-field__helper">{{ Math.round(pct) }}%</span>
    </div>
    <ProgressRoot :model-value="modelValue ?? undefined" :max="max" class="fvue-progress__track">
      <ProgressIndicator class="fvue-progress__bar" :style="pct !== null ? { width: `${pct}%` } : undefined" />
    </ProgressRoot>
    <p v-if="helperText" class="fvue-field__helper">{{ helperText }}</p>
  </div>
</template>

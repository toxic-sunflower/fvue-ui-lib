<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    share?: string
    value?: number
    max?: number
  }>(),
  { max: 100 },
)
</script>

<template>
  <div class="fvue-demographics">
    <div class="fvue-demographics__row">
      <span class="fvue-demographics__glyph"><slot name="glyph" /></span>
      <span class="fvue-demographics__label"><slot>{{ label }}</slot></span>
      <span class="fvue-demographics__share">{{ share }}</span>
    </div>
    <div class="fvue-demographics__track" role="progressbar" :aria-valuenow="value" :aria-valuemin="0" :aria-valuemax="max" :aria-label="label">
      <div class="fvue-demographics__bar" :style="{ width: `${Math.min(100, Math.max(0, ((value ?? 0) / max) * 100))}%` }" />
    </div>
  </div>
</template>

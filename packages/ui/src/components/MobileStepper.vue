<script setup lang="ts">
import type { StepperStep } from './Stepper.vue'

withDefaults(
  defineProps<{
    steps?: StepperStep[]
    active?: string
  }>(),
  { steps: () => [] },
)
</script>

<template>
  <div class="fvue-mobile-stepper" role="group" aria-label="Progress">
    <div class="fvue-mobile-stepper__bar" aria-hidden="true">
      <div
        v-for="s in steps"
        :key="s.value"
        class="fvue-mobile-stepper__segment"
        :class="s.value === active && 'fvue-mobile-stepper__segment--active'"
      />
    </div>
    <span class="fvue-mobile-stepper__label"><slot /></span>
  </div>
</template>

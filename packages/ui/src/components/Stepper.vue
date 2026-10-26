<script setup lang="ts">
export interface StepperStep {
  value: string
  label: string
}

withDefaults(
  defineProps<{
    steps?: StepperStep[]
    active?: string
    completed?: string[]
  }>(),
  { steps: () => [], completed: () => [] },
)
</script>

<template>
  <ol class="fvue-stepper" aria-label="Progress">
    <li
      v-for="s in steps"
      :key="s.value"
      class="fvue-stepper__step"
      :class="[
        s.value === active && 'fvue-stepper__step--active',
        completed.includes(s.value) && 'fvue-stepper__step--completed',
      ]"
      :aria-current="s.value === active ? 'step' : undefined"
    >
      <span class="fvue-stepper__dot" aria-hidden="true" />
      <span class="fvue-stepper__label">{{ s.label }}</span>
    </li>
  </ol>
</template>

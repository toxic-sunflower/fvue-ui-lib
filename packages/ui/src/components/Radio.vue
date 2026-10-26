<script setup lang="ts">
import { computed, useId } from 'vue'
import { RadioGroupIndicator, RadioGroupItem } from 'reka-ui'

const props = withDefaults(
  defineProps<{
    value: string
    label?: string
    description?: string
    disabled?: boolean
    id?: string
  }>(),
  { disabled: false },
)

const uid = useId()

const labelId = computed(() => `${props.id ?? 'fvue-radio'}-${uid}-label`)
</script>

<template>
  <div class="fvue-check-field">
    <RadioGroupItem :id="id" :value="value" :disabled="disabled" class="fvue-radio" :aria-labelledby="label ? labelId : undefined">
      <RadioGroupIndicator class="fvue-radio__dot" />
    </RadioGroupItem>
    <div>
      <label v-if="label" :id="labelId" :for="id" class="fvue-field__label">{{ label }}</label>
      <p v-if="description" class="fvue-field__helper">{{ description }}</p>
      <slot />
    </div>
  </div>
</template>

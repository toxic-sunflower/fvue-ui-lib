<script setup lang="ts">
import { computed, useId } from 'vue'
import { SelectRoot, SelectTrigger, SelectValue } from 'reka-ui'
import type { SelectSize, SelectVariant } from '../types'
import { cn } from '../cn'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    defaultValue?: string
    label?: string
    helperText?: string
    error?: boolean
    errorMessage?: string
    placeholder?: string
    disabled?: boolean
    size?: SelectSize
    variant?: SelectVariant
    fullWidth?: boolean
    id?: string
    name?: string
  }>(),
  { size: '48', variant: 'default', disabled: false, error: false, fullWidth: false },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onUpdateModelValue(value: string) {
  emit('update:modelValue', value)
}

const uid = useId()

const triggerId = computed(() => props.id ?? `fvue-select-${uid}`)
const labelId = computed(() => `${triggerId.value}-label`)
const describedBy = computed(() => {
  if (props.error && props.errorMessage) return `${triggerId.value}-error`
  if (props.helperText) return `${triggerId.value}-helper`
  return undefined
})
</script>

<template>
  <div class="fvue-field" :class="fullWidth && 'fvue-field--full-width'">
    <label v-if="label" class="fvue-field__label" :id="labelId" :for="triggerId">{{ label }}</label>
    <SelectRoot
      :model-value="modelValue"
      :default-value="defaultValue"
      :disabled="disabled"
      :name="name"
      @update:model-value="onUpdateModelValue"
    >
      <SelectTrigger
        :id="triggerId"
        :class="cn('fvue-select-trigger', `fvue-select-trigger--${size}`, variant === 'filled' && 'fvue-select-trigger--filled')"
        :aria-invalid="error || undefined"
        :aria-describedby="describedBy"
        :aria-labelledby="label ? labelId : undefined"
        :aria-label="!label ? placeholder : undefined"
      >
        <slot name="leftIcon" />
        <SelectValue :placeholder="placeholder" style="flex: 1; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" />
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </SelectTrigger>
      <slot />
    </SelectRoot>
    <p v-if="error && errorMessage" :id="`${triggerId}-error`" class="fvue-field__error" role="alert">
      {{ errorMessage }}
    </p>
    <p v-else-if="helperText" :id="`${triggerId}-helper`" class="fvue-field__helper">{{ helperText }}</p>
  </div>
</template>

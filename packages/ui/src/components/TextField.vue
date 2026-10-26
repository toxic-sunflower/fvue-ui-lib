<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import type { TextFieldSize } from '../types'

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
    readonly?: boolean
    size?: TextFieldSize
    type?: string
    id?: string
    name?: string
    fullWidth?: boolean
  }>(),
  { size: '40', type: 'text', disabled: false, readonly: false, error: false, fullWidth: false },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

function onFocus(event: FocusEvent) {
  emit('focus', event)
}

function onBlur(event: FocusEvent) {
  emit('blur', event)
}

const uid = useId()

const inner = ref(props.defaultValue ?? props.modelValue ?? '')
watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) inner.value = v
  },
)

const inputId = computed(() => props.id ?? `fvue-field-${uid}`)
const describedBy = computed(() => {
  if (props.error && props.errorMessage) return `${inputId.value}-error`
  if (props.helperText) return `${inputId.value}-helper`
  return undefined
})

function onInput(event: Event) {
  const v = (event.target as HTMLInputElement).value
  inner.value = v
  emit('update:modelValue', v)
}
</script>

<template>
  <div class="fvue-field" :class="fullWidth && 'fvue-field--full-width'">
    <label v-if="label" class="fvue-field__label" :for="inputId">{{ label }}</label>
    <div
      class="fvue-input"
      :class="[
        `fvue-input--${size}`,
        error && 'fvue-input--error',
        disabled && 'fvue-input--disabled',
      ]"
    >
      <span v-if="$slots.leftIcon" class="fvue-input__icon"><slot name="leftIcon" /></span>
      <input
        :id="inputId"
        :value="inner"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :aria-invalid="error || undefined"
        :aria-describedby="describedBy"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
      <span v-if="$slots.rightIcon" class="fvue-input__icon"><slot name="rightIcon" /></span>
    </div>
    <p v-if="error && errorMessage" :id="`${inputId}-error`" class="fvue-field__error" role="alert">
      {{ errorMessage }}
    </p>
    <p v-else-if="helperText" :id="`${inputId}-helper`" class="fvue-field__helper">{{ helperText }}</p>
  </div>
</template>

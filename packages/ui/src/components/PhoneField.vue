<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    defaultValue?: string
    country?: string
    dialCode?: string
    label?: string
    helperText?: string
    error?: boolean
    errorMessage?: string
    placeholder?: string
    disabled?: boolean
  }>(),
  { dialCode: '+1', disabled: false, error: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: string]; 'update:country': [value: string] }>()

const uid = useId()

const inner = ref(props.defaultValue ?? props.modelValue ?? '')
watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) inner.value = v
  },
)

const inputId = computed(() => `fvue-phone-${uid}`)

function onInput(event: Event) {
  const v = (event.target as HTMLInputElement).value
  inner.value = v
  emit('update:modelValue', v)
}
</script>

<template>
  <div class="fvue-field">
    <label v-if="label" class="fvue-field__label" :for="inputId">{{ label }}</label>
    <div class="fvue-input fvue-input--40" :class="[error && 'fvue-input--error', disabled && 'fvue-input--disabled']">
      <button type="button" class="fvue-phone__country" :disabled="disabled" :aria-label="`Country ${country ?? ''}`">
        <slot name="flag">{{ country ?? '🌐' }}</slot>
        <span class="fvue-phone__dial">{{ dialCode }}</span>
      </button>
      <input
        :id="inputId"
        :value="inner"
        type="tel"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-invalid="error || undefined"
        @input="onInput"
      />
    </div>
    <p v-if="error && errorMessage" class="fvue-field__error" role="alert">{{ errorMessage }}</p>
    <p v-else-if="helperText" class="fvue-field__helper">{{ helperText }}</p>
  </div>
</template>

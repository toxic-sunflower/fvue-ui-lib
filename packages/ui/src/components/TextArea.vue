<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'

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
    rows?: number
    id?: string
    name?: string
    fullWidth?: boolean
  }>(),
  { disabled: false, readonly: false, error: false, rows: 3, fullWidth: false },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const uid = useId()

const inner = ref(props.defaultValue ?? props.modelValue ?? '')
watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) inner.value = v
  },
)

const inputId = computed(() => props.id ?? `fvue-area-${uid}`)

function onInput(event: Event) {
  const v = (event.target as HTMLTextAreaElement).value
  inner.value = v
  emit('update:modelValue', v)
}
function onFocus(e: FocusEvent) {
  emit('focus', e)
}
function onBlur(e: FocusEvent) {
  emit('blur', e)
}
</script>

<template>
  <div class="fvue-field" :class="fullWidth && 'fvue-field--full-width'">
    <label v-if="label" class="fvue-field__label" :for="inputId">{{ label }}</label>
    <div class="fvue-input" :class="[error && 'fvue-input--error', disabled && 'fvue-input--disabled']">
      <textarea
        :id="inputId"
        :value="inner"
        :name="name"
        :rows="rows"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :aria-invalid="error || undefined"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>
    <p v-if="error && errorMessage" class="fvue-field__error" role="alert">{{ errorMessage }}</p>
    <p v-else-if="helperText" class="fvue-field__helper">{{ helperText }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

export type DatePickerMode = 'single' | 'range'
export interface DateRangeValue {
  from?: string
  to?: string
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | DateRangeValue
    defaultValue?: string | DateRangeValue
    mode?: DatePickerMode
    label?: string
    placeholder?: string
    disabled?: boolean
    min?: string
    max?: string
  }>(),
  { mode: 'single', disabled: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: string | DateRangeValue] }>()

const inner = ref(props.defaultValue ?? props.modelValue ?? (props.mode === 'range' ? { from: '', to: '' } : ''))
watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) inner.value = v
  },
)

const single = computed({
  get: () => (typeof inner.value === 'string' ? inner.value : ''),
  set: (v: string) => {
    inner.value = v
    emit('update:modelValue', v)
  },
})
const rangeFrom = computed({
  get: () => (typeof inner.value === 'object' ? (inner.value.from ?? '') : ''),
  set: (v: string) => {
    const next = { ...(typeof inner.value === 'object' ? inner.value : {}), from: v }
    inner.value = next
    emit('update:modelValue', next)
  },
})
const rangeTo = computed({
  get: () => (typeof inner.value === 'object' ? (inner.value.to ?? '') : ''),
  set: (v: string) => {
    const next = { ...(typeof inner.value === 'object' ? inner.value : {}), to: v }
    inner.value = next
    emit('update:modelValue', next)
  },
})
</script>

<template>
  <div class="fvue-field">
    <label v-if="label" class="fvue-field__label">{{ label }}</label>
    <div v-if="mode === 'single'" class="fvue-input fvue-input--40" :class="disabled && 'fvue-input--disabled'">
      <input v-model="single" type="date" :min="min" :max="max" :placeholder="placeholder" :disabled="disabled" aria-label="Date" />
    </div>
    <div v-else class="fvue-date-range">
      <div class="fvue-input fvue-input--40" :class="disabled && 'fvue-input--disabled'">
        <input v-model="rangeFrom" type="date" :min="min" :max="rangeTo || max" :disabled="disabled" aria-label="Start date" />
      </div>
      <span class="fvue-date-range__sep" aria-hidden="true">–</span>
      <div class="fvue-input fvue-input--40" :class="disabled && 'fvue-input--disabled'">
        <input v-model="rangeTo" type="date" :min="rangeFrom || min" :max="max" :disabled="disabled" aria-label="End date" />
      </div>
    </div>
  </div>
</template>

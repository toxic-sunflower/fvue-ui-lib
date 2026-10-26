<script setup lang="ts">
import { computed, useId } from 'vue'
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean | 'indeterminate'
    defaultValue?: boolean
    label?: string
    helperText?: string
    disabled?: boolean
    id?: string
  }>(),
  { modelValue: undefined, defaultValue: undefined, disabled: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: boolean | 'indeterminate'] }>()

function onUpdateModelValue(value: boolean | 'indeterminate') {
  emit('update:modelValue', value)
}

const uid = useId()

const labelId = computed(() => `${props.id ?? 'fvue-check'}-${uid}-label`)

const rootProps = computed(() => ({
  ...(props.modelValue !== undefined ? { modelValue: props.modelValue } : {}),
  ...(props.defaultValue !== undefined ? { defaultValue: props.defaultValue } : {}),
  disabled: props.disabled,
  ...(props.label ? { 'aria-labelledby': labelId.value } : {}),
}))
</script>

<template>
  <div class="fvue-check-field">
    <CheckboxRoot
      :id="id"
      class="fvue-checkbox"
      v-bind="rootProps"
      @update:model-value="onUpdateModelValue"
    >
      <CheckboxIndicator as-child>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2 6.5 4.8 9 10 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </CheckboxIndicator>
    </CheckboxRoot>
    <div>
      <label v-if="label" :id="labelId" :for="id" class="fvue-field__label">{{ label }}</label>
      <p v-if="helperText" class="fvue-field__helper">{{ helperText }}</p>
    </div>
  </div>
</template>

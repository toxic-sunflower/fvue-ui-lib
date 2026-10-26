<script setup lang="ts">
import { computed, useId } from 'vue'
import { SwitchRoot, SwitchThumb } from 'reka-ui'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    defaultValue?: boolean
    label?: string
    disabled?: boolean
    id?: string
  }>(),
  { modelValue: undefined, defaultValue: undefined, disabled: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

function onUpdateModelValue(value: boolean) {
  emit('update:modelValue', value)
}

const uid = useId()

const labelId = computed(() => `${props.id ?? 'fvue-switch'}-${uid}-label`)

const rootProps = computed(() => ({
  ...(props.modelValue !== undefined ? { modelValue: props.modelValue } : {}),
  ...(props.defaultValue !== undefined ? { defaultValue: props.defaultValue } : {}),
  disabled: props.disabled,
  ...(props.label ? { 'aria-labelledby': labelId.value } : {}),
}))
</script>

<template>
  <div class="fvue-check-field">
    <SwitchRoot
      :id="id"
      class="fvue-switch"
      role="switch"
      v-bind="rootProps"
      @update:model-value="onUpdateModelValue"
    >
      <SwitchThumb class="fvue-switch__thumb" />
    </SwitchRoot>
    <label v-if="label" :id="labelId" :for="id" class="fvue-field__label">{{ label }}</label>
  </div>
</template>

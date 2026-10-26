<script setup lang="ts">
import { computed } from 'vue'
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from 'reka-ui'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    defaultValue?: string
    disabled?: boolean
    orientation?: 'horizontal' | 'vertical'
  }>(),
  { disabled: false, orientation: 'vertical' },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const rootProps = computed(() => ({
  ...(props.modelValue !== undefined ? { modelValue: props.modelValue } : {}),
  ...(props.defaultValue !== undefined ? { defaultValue: props.defaultValue } : {}),
  disabled: props.disabled,
  orientation: props.orientation,
}))

function onUpdate(v: unknown) {
  if (typeof v === 'string') emit('update:modelValue', v)
}
</script>

<template>
  <RadioGroupRoot v-bind="rootProps" class="fvue-radio-group" @update:model-value="onUpdate">
    <slot />
  </RadioGroupRoot>
</template>

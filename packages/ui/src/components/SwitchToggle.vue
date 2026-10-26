<script setup lang="ts">
import { computed } from 'vue'
import { RadioGroupItem, RadioGroupRoot } from 'reka-ui'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    defaultValue?: string
    options?: { value: string; label?: string; disabled?: boolean }[]
    disabled?: boolean
  }>(),
  { options: () => [{ value: 'off', label: 'Off' }, { value: 'on', label: 'On' }], disabled: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const rootProps = computed(() => ({
  ...(props.modelValue !== undefined ? { modelValue: props.modelValue } : {}),
  ...(props.defaultValue !== undefined ? { defaultValue: props.defaultValue } : {}),
  disabled: props.disabled,
}))

function onUpdate(v: unknown) {
  if (typeof v === 'string') emit('update:modelValue', v)
}
</script>

<template>
  <RadioGroupRoot v-bind="rootProps" class="fvue-switch-toggle" role="radiogroup" @update:model-value="onUpdate">
    <RadioGroupItem v-for="opt in options" :key="opt.value" :value="opt.value" :disabled="disabled || opt.disabled" class="fvue-switch-toggle__item">
      <slot :name="opt.value" :option="opt">{{ opt.label ?? opt.value }}</slot>
    </RadioGroupItem>
  </RadioGroupRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RadioGroupItem, RadioGroupRoot } from 'reka-ui'

export interface SegmentedControlOption {
  value: string
  label?: string
  icon?: boolean
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    modelValue?: string
    defaultValue?: string
    options?: SegmentedControlOption[]
    disabled?: boolean
    collapsedIcon?: string
  }>(),
  { options: () => [], disabled: false },
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
  <RadioGroupRoot v-bind="rootProps" class="fvue-segmented" role="radiogroup" @update:model-value="onUpdate">
    <RadioGroupItem
      v-for="o in options"
      :key="o.value"
      :value="o.value"
      :disabled="disabled || o.disabled"
      class="fvue-segmented__item"
    >
      <slot :name="o.value" :option="o">
        <slot v-if="o.icon" name="icon" :option="o" />
        <span v-if="o.label">{{ o.label }}</span>
      </slot>
    </RadioGroupItem>
  </RadioGroupRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'

const props = withDefaults(
  defineProps<{
    modelValue?: number[]
    defaultValue?: number[]
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    label?: string
  }>(),
  { min: 0, max: 100, step: 1, disabled: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: number[]] }>()

const rootProps = computed(() => ({
  ...(props.modelValue !== undefined ? { modelValue: props.modelValue } : {}),
  ...(props.defaultValue !== undefined ? { defaultValue: props.defaultValue } : {}),
  min: props.min,
  max: props.max,
  step: props.step,
  disabled: props.disabled,
}))

function onUpdate(v: unknown) {
  if (Array.isArray(v)) emit('update:modelValue', v as number[])
}
</script>

<template>
  <div class="fvue-field">
    <span v-if="label" class="fvue-field__label">{{ label }}</span>
    <SliderRoot v-bind="rootProps" class="fvue-slider" @update:model-value="onUpdate">
      <SliderTrack class="fvue-slider__track">
        <SliderRange class="fvue-slider__range" />
      </SliderTrack>
      <SliderThumb v-for="(_, i) in (modelValue ?? defaultValue ?? [min])" :key="i" class="fvue-slider__thumb" :aria-label="label" />
    </SliderRoot>
  </div>
</template>

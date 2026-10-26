<script setup lang="ts">
import { computed } from 'vue'
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from 'reka-ui'

const props = withDefaults(
  defineProps<{
    modelValue?: string | string[]
    defaultValue?: string | string[]
    type?: 'single' | 'multiple'
    collapsible?: boolean
    disabled?: boolean
  }>(),
  { type: 'single', collapsible: true, disabled: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: string | string[] | undefined] }>()

const rootProps = computed(() => ({
  ...(props.modelValue !== undefined ? { modelValue: props.modelValue } : {}),
  ...(props.defaultValue !== undefined ? { defaultValue: props.defaultValue } : {}),
  type: props.type,
  collapsible: props.collapsible,
  disabled: props.disabled,
}))

function onUpdate(v: string | string[] | undefined) {
  if (v !== undefined) emit('update:modelValue', v)
}
</script>

<template>
  <AccordionRoot v-bind="rootProps" class="fvue-accordion" @update:model-value="onUpdate">
    <slot />
  </AccordionRoot>
</template>

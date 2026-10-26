<script setup lang="ts">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import { cn } from '../cn'

withDefaults(
  defineProps<{
    modelValue?: string
    defaultValue?: string
    variant?: 'default' | 'pill'
    scrollable?: boolean
    fullWidth?: boolean
  }>(),
  { variant: 'default', scrollable: false, fullWidth: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

function onUpdateModelValue(value: string) {
  emit('update:modelValue', value)
}
</script>

<template>
  <TabsRoot :model-value="modelValue" :default-value="defaultValue" @update:model-value="onUpdateModelValue">
    <slot />
  </TabsRoot>
</template>

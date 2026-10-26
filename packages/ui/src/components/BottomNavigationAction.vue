<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    defaultValue?: string
    label?: string
    disabled?: boolean
  }>(),
  { disabled: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const active = computed(() => props.modelValue ?? props.defaultValue)

function select(value: string) {
  if (!props.disabled) emit('update:modelValue', value)
}
</script>

<template>
  <div class="fvue-bottom-nav__actions" role="group" :aria-label="label">
    <slot :active="active" :select="select" />
  </div>
</template>

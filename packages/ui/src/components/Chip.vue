<script setup lang="ts">
import { cn } from '../cn'

export type ChipVariant = 'default' | 'outlined' | 'dotted'

const props = withDefaults(
  defineProps<{
    variant?: ChipVariant
    selected?: boolean
    disabled?: boolean
  }>(),
  { variant: 'default', selected: false, disabled: false },
)

defineEmits<{ click: [event: MouseEvent]; toggle: [value: boolean] }>()
</script>

<template>
  <button
    type="button"
    :class="cn('fvue-chip', `fvue-chip--${variant}`, selected && 'fvue-chip--selected')"
    :disabled="disabled"
    :aria-pressed="selected"
    @click="$emit('click', $event); $emit('toggle', !selected)"
  >
    <slot />
  </button>
</template>

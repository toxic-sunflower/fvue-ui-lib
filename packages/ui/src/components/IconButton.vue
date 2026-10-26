<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../cn'

export type IconButtonVariant = 'default' | 'field' | 'ghost'
export type IconButtonSize = '24' | '32' | '40'

const props = withDefaults(
  defineProps<{
    variant?: IconButtonVariant
    size?: IconButtonSize
    disabled?: boolean
    label?: string
    type?: 'button' | 'submit' | 'reset'
  }>(),
  { variant: 'default', size: '40', disabled: false, type: 'button' },
)

defineEmits<{ click: [event: MouseEvent] }>()

const classes = computed(() =>
  cn('fvue-icon-btn', `fvue-icon-btn--${props.variant}`, `fvue-icon-btn--${props.size}`),
)
</script>

<template>
  <button :type="type" :class="classes" :disabled="disabled" :aria-label="label" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

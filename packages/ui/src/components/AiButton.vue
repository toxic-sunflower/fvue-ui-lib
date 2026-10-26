<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../cn'

export type AiButtonSize = '24' | '32' | '40'

const props = withDefaults(
  defineProps<{
    label?: string
    activeLabel?: string
    active?: boolean
    idleShimmer?: boolean
    size?: AiButtonSize
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  { active: false, idleShimmer: true, size: '32', type: 'button', disabled: false },
)

defineEmits<{ click: [event: MouseEvent] }>()

const text = computed(() => (props.active && props.activeLabel ? props.activeLabel : props.label))
const classes = computed(() =>
  cn(
    'fvue-btn',
    'fvue-ai-btn',
    `fvue-btn--${props.size}`,
    props.active && 'fvue-ai-btn--active',
    props.idleShimmer && !props.active && 'fvue-ai-btn--shimmer',
  ),
)
</script>

<template>
  <button :type="type" :class="classes" :disabled="disabled" @click="$emit('click', $event)">
    <slot name="icon">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1.5 9.8 6.2 14.5 8 9.8 9.8 8 14.5 6.2 9.8 1.5 8 6.2 6.2 8 1.5Z" fill="currentColor" />
      </svg>
    </slot>
    <slot>{{ text }}</slot>
  </button>
</template>

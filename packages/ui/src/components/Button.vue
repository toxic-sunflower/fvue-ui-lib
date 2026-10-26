<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../cn'
import type { ButtonSize, ButtonVariant } from '../types'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    loading?: boolean
    disabled?: boolean
    fullWidth?: boolean
    negative?: boolean
    type?: 'button' | 'submit' | 'reset'
    price?: string
    discount?: string
  }>(),
  { variant: 'primary', size: '40', loading: false, disabled: false, fullWidth: false, negative: false, type: 'button' },
)

defineEmits<{ click: [event: MouseEvent] }>()

const classes = computed(() =>
  cn(
    'fvue-btn',
    `fvue-btn--${props.variant}`,
    `fvue-btn--${props.size}`,
    props.fullWidth && 'fvue-btn--full-width',
    props.negative && 'fvue-btn--negative',
    props.loading && 'fvue-btn--loading',
  ),
)
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="fvue-btn__spinner" aria-hidden="true" />
    <slot name="leftIcon" />
    <slot />
    <span v-if="discount" class="fvue-btn__discount">{{ discount }}</span>
    <span v-if="price" class="fvue-btn__price">{{ price }}</span>
    <slot name="rightIcon" />
  </button>
</template>

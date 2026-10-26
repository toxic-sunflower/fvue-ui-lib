<script setup lang="ts">
import { SelectItem, SelectItemIndicator, SelectItemText } from 'reka-ui'
import type { SelectItemSize } from '../types'

withDefaults(
  defineProps<{
    value: string
    disabled?: boolean
    size?: SelectItemSize
  }>(),
  { disabled: false, size: '40' },
)
</script>

<template>
  <SelectItem :value="value" :disabled="disabled" :class="`fvue-select-item fvue-select-item--${size}`">
    <span v-if="$slots.leadingIcon || $slots.avatar" class="fvue-input__icon">
      <slot name="avatar" />
      <slot name="leadingIcon" />
    </span>
    <span style="flex: 1; min-width: 0;">
      <SelectItemText><slot /></SelectItemText>
      <span v-if="$slots.description" class="fvue-select-item__description"><slot name="description" /></span>
    </span>
    <SelectItemIndicator class="fvue-select-item__check">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </SelectItemIndicator>
  </SelectItem>
</template>

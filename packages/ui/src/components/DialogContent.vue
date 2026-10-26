<script setup lang="ts">
import { DialogContent, DialogOverlay, DialogPortal } from 'reka-ui'
import type { DialogMobilePresentation, DialogSize } from '../types'
import { cn } from '../cn'

const props = withDefaults(
  defineProps<{
    size?: DialogSize
    mobilePresentation?: DialogMobilePresentation
    overlay?: boolean
    portal?: boolean
    showMobileHandle?: boolean
  }>(),
  { size: 'md', mobilePresentation: 'sheet', overlay: true, portal: true, showMobileHandle: true },
)
</script>

<template>
  <DialogPortal :disabled="!portal">
    <DialogOverlay v-if="overlay" class="fvue-overlay" />
    <DialogContent
      :class="
        cn(
          'fvue-dialog',
          `fvue-dialog--${size}`,
          mobilePresentation === 'sheet' && 'fvue-dialog--sheet',
          mobilePresentation === 'card' && 'fvue-dialog--card',
        )
      "
    >
      <div v-if="showMobileHandle && mobilePresentation === 'sheet'" class="fvue-dialog__handle" aria-hidden="true" />
      <slot />
    </DialogContent>
  </DialogPortal>
</template>

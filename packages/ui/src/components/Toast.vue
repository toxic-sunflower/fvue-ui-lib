<script setup lang="ts">
import { ToastAction, ToastClose, ToastDescription, ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'reka-ui'
import { useToast } from './useToast'

const { toasts, dismiss } = useToast()

withDefaults(defineProps<{ duration?: number }>(), { duration: 4000 })
</script>

<template>
  <ToastProvider>
    <slot />
    <ToastRoot
      v-for="t in toasts"
      :key="t.id"
      class="fvue-toast"
      :open="true"
      :duration="t.duration ?? duration"
      @update:open="(open) => { if (!open) dismiss(t.id) }"
    >
      <div style="flex: 1; min-width: 0;">
        <ToastTitle v-if="t.title" class="fvue-toast__title">{{ t.title }}</ToastTitle>
        <ToastDescription v-if="t.description" class="fvue-toast__description">{{ t.description }}</ToastDescription>
      </div>
      <ToastAction as-child alt-text="Action">
        <slot name="action" :toast="t" />
      </ToastAction>
      <ToastClose class="fvue-dialog__close" aria-label="Close">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </ToastClose>
    </ToastRoot>
    <ToastViewport class="fvue-toast-viewport" />
  </ToastProvider>
</template>

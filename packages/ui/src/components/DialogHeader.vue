<script setup lang="ts">
import { DialogClose } from 'reka-ui'

withDefaults(
  defineProps<{
    showClose?: boolean
    showBack?: boolean
    closeLabel?: string
    backLabel?: string
  }>(),
  { showClose: true, closeLabel: 'Close', backLabel: 'Go back' },
)

defineEmits<{ back: [] }>()
</script>

<template>
  <div class="fvue-dialog__header">
    <div style="flex: 1; min-width: 0;">
      <button v-if="showBack" type="button" class="fvue-dialog__close" :aria-label="backLabel" @click="$emit('back')">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 3 5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <slot />
    </div>
    <DialogClose v-if="showClose" class="fvue-dialog__close" :aria-label="closeLabel">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </DialogClose>
  </div>
</template>

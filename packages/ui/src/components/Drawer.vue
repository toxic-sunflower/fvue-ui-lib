<script setup lang="ts">
import { computed } from 'vue'
import { DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogRoot, DialogTrigger } from 'reka-ui'
import type { DrawerSide } from '../types'
import { cn } from '../cn'

const props = withDefaults(
  defineProps<{
    open?: boolean
    defaultOpen?: boolean
    side?: DrawerSide
    modal?: boolean
    closeLabel?: string
  }>(),
  { open: undefined, defaultOpen: undefined, side: 'right', modal: true, closeLabel: 'Close' },
)

const emit = defineEmits<{ 'update:open': [value: boolean] }>()

function onOpenChange(value: boolean) {
  emit('update:open', value)
}

const rootProps = computed(() => ({
  ...(props.open !== undefined ? { open: props.open } : {}),
  ...(props.defaultOpen !== undefined ? { defaultOpen: props.defaultOpen } : {}),
  modal: props.modal,
}))
</script>

<template>
  <DialogRoot v-bind="rootProps" @update:open="onOpenChange">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fvue-overlay" />
      <DialogContent :class="cn('fvue-drawer', side === 'left' && 'fvue-drawer--left')" aria-describedby="">
        <div class="fvue-dialog__header">
          <div style="flex: 1; min-width: 0;">
            <slot name="title" />
            <slot name="description" />
          </div>
          <DialogClose class="fvue-dialog__close" :aria-label="closeLabel">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </DialogClose>
        </div>
        <div class="fvue-dialog__body">
          <slot />
        </div>
        <div class="fvue-dialog__footer">
          <slot name="footer" />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

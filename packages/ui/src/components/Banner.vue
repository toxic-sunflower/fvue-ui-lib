<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'default' | 'promo' | 'info'
    layout?: 'vertical' | 'horizontal' | 'compact'
    dismissLabel?: string
  }>(),
  { variant: 'default', layout: 'horizontal', dismissLabel: 'Dismiss' },
)

const emit = defineEmits<{ close: [] }>()

function onClose() {
  emit('close')
}
</script>

<template>
  <div class="fvue-banner" :class="[`fvue-banner--${variant}`, `fvue-banner--${layout}`]" role="region">
    <div class="fvue-banner__media"><slot name="media" /></div>
    <div class="fvue-banner__body">
      <slot />
      <div v-if="$slots.actions" class="fvue-banner__actions"><slot name="actions" /></div>
    </div>
    <button type="button" class="fvue-dialog__close" :aria-label="dismissLabel" @click="onClose">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

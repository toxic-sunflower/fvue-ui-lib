<script setup lang="ts">

export type AlertVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral'

const props = withDefaults(
  defineProps<{
    variant?: AlertVariant
    title?: string
    closable?: boolean
    closeLabel?: string
  }>(),
  { variant: 'info', closable: false, closeLabel: 'Dismiss' },
)

const emit = defineEmits<{ close: [] }>()

function onClose() {
  emit('close')
}
</script>

<template>
  <div class="fvue-alert" :class="`fvue-alert--${variant}`" role="alert">
    <span class="fvue-alert__icon" aria-hidden="true"><slot name="icon" /></span>
    <div class="fvue-alert__body">
      <p v-if="title" class="fvue-alert__title">{{ title }}</p>
      <div class="fvue-alert__content"><slot /></div>
      <div v-if="$slots.action" class="fvue-alert__action"><slot name="action" /></div>
    </div>
    <button v-if="closable" type="button" class="fvue-dialog__close" :aria-label="closeLabel" @click="onClose">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

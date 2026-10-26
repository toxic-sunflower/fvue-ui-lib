<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
    closable?: boolean
    closeLabel?: string
  }>(),
  { closable: true, closeLabel: 'Dismiss' },
)

const emit = defineEmits<{ close: [] }>()

function onClose() {
  emit('close')
}
</script>

<template>
  <div class="fvue-snackbar" role="status">
    <div class="fvue-snackbar__body">
      <p v-if="title" class="fvue-snackbar__title">{{ title }}</p>
      <p v-if="description" class="fvue-snackbar__description">{{ description }}</p>
      <slot />
    </div>
    <div v-if="$slots.actions" class="fvue-snackbar__actions"><slot name="actions" /></div>
    <button v-if="closable" type="button" class="fvue-dialog__close" :aria-label="closeLabel" @click="onClose">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    status?: 'flagged' | 'removed' | 'sensitive' | 'ok'
    label?: string
  }>(),
  { status: 'ok' },
)
</script>

<template>
  <span v-if="status !== 'ok'" class="fvue-media-status" :class="`fvue-media-status--${status}`" role="status" :aria-label="label ?? status">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M6 1 11 10.5H1L6 1Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
      <path d="M6 4.5v2.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
      <circle cx="6" cy="8.8" r="0.8" fill="currentColor" />
    </svg>
  </span>
</template>

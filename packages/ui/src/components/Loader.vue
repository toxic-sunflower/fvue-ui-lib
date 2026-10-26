<script setup lang="ts">
withDefaults(defineProps<{ size?: number; label?: string }>(), { size: 24, label: 'Loading' })
</script>

<template>
  <div class="fvue-loader" role="status" :aria-label="label">
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="42" stroke-dashoffset="14" />
    </svg>
  </div>
</template>

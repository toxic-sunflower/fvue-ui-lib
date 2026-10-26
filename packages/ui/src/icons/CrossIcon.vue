<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 20 })
</script>

<template>
  <svg viewBox="0 0 20 20" :width="size" :height="size" fill="none" aria-hidden="true" class="fvue-icon">
    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
  </svg>
</template>

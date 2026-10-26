<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 20 })
</script>

<template>
  <svg viewBox="0 0 20 20" :width="size" :height="size" fill="none" aria-hidden="true" class="fvue-icon">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeOpacity=".25" stroke-width="2" />
      <path d="M10 2a8 8 0 0 1 8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>
</template>

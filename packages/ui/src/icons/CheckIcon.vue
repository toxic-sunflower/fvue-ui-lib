<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 12 })
</script>

<template>
  <svg viewBox="0 0 12 12" :width="size" :height="size" fill="none" aria-hidden="true" class="fvue-icon">
    <path
        d="M10 3 4.5 8.5 2 6"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
  </svg>
</template>

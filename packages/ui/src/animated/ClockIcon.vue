<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 24 })
</script>

<template>
  <svg viewBox="0 0 24 24" :width="size" :height="size" fill="none" aria-hidden="true" class="fvue-icon">
    <circle cx="12" cy="12" r="10" />
        <line
          
          initial="normal"
          
          
          x1="12"
          x2="12"
          y1="12"
          y2="6"
        />
        <line
          
          initial="normal"
          
          
          x1="12"
          x2="16"
          y1="12"
          y2="12"
        />
  </svg>
</template>

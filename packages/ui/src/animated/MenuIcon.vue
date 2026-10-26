<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 24 })
</script>

<template>
  <svg viewBox="0 0 24 24" :width="size" :height="size" fill="none" aria-hidden="true" class="fvue-icon">
    <line
          
          custom="1"
          initial="normal"
          
          x1="4"
          x2="20"
          y1="6"
          y2="6"
        />
        <line
          
          custom="2"
          initial="normal"
          
          x1="4"
          x2="20"
          y1="12"
          y2="12"
        />
        <line
          
          custom="3"
          initial="normal"
          
          x1="4"
          x2="20"
          y1="18"
          y2="18"
        />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 24 })
</script>

<template>
  <svg viewBox="0 0 24 24" :width="size" :height="size" fill="none" aria-hidden="true" class="fvue-icon">
    <g  initial="normal" >
          <rect height="14" rx="2" width="20" x="2" y="5" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </g>
  </svg>
</template>

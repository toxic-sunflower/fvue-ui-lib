<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 20 })
</script>

<template>
  <svg viewBox="0 0 20 20" :width="size" :height="size" fill="none" aria-hidden="true" class="fvue-icon">
    <path
        d="M6.667 13.333 10 10m0 0 3.333 3.333M10 10v7.5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.992 14.825a4.167 4.167 0 0 0-2.159-7.158 5.835 5.835 0 0 0-10.75 2.916A3.333 3.333 0 0 0 5 17.5h11.167a4.167 4.167 0 0 0 .825-2.675Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
  </svg>
</template>

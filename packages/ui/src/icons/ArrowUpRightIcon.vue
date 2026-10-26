<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 20 })
</script>

<template>
  <svg viewBox="0 0 20 20" :width="size" :height="size" fill="none" aria-hidden="true" class="fvue-icon">
    <path
        fill-rule="evenodd"
        d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
        clip-rule="evenodd"
      />
  </svg>
</template>

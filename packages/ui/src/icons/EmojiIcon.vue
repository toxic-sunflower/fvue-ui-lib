<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 24 })
</script>

<template>
  <svg viewBox="0 0 24 24" :width="size" :height="size" fill="none" aria-hidden="true" class="fvue-icon">
    <path
          d="M11.97 22c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.5 10.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM15.5 10.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          fill="currentColor"
        />
        <path
          d="M7.21 16A5.831 5.831 0 0 0 12 18.5c1.98 0 3.73-.99 4.79-2.5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
  </svg>
</template>

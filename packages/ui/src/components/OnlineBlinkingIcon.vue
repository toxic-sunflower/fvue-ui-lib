<script setup lang="ts">
withDefaults(defineProps<{ size?: number; label?: string }>(), { size: 8 })
</script>

<template>
  <span
    class="fvue-online-dot"
    :style="{ width: `${size}px`, height: `${size}px` }"
    :role="label ? 'status' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : true"
  />
</template>

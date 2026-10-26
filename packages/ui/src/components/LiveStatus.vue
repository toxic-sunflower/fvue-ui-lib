<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), {})
</script>

<template>
  <span class="fvue-live-status" role="status" :aria-label="label ?? 'Live'">
    <span class="fvue-live-status__dot" aria-hidden="true" />
    <slot>{{ label ?? 'Live' }}</slot>
  </span>
</template>

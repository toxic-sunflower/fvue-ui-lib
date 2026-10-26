<script setup lang="ts">
withDefaults(
  defineProps<{
    fans?: number | string
    followers?: string
    subscribers?: string
  }>(),
  {},
)
</script>

<template>
  <div class="fvue-fan-count">
    <span v-if="fans !== undefined" class="fvue-fan-count__item">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="5" r="3" stroke="currentColor" stroke-width="1.4" />
        <path d="M2.5 14c.8-2.6 2.9-4 5.5-4s4.7 1.4 5.5 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
      </svg>
      {{ fans }} fans
    </span>
    <span v-if="followers || subscribers" class="fvue-fan-count__item">{{ followers ?? subscribers }} subscribers</span>
    <slot />
  </div>
</template>

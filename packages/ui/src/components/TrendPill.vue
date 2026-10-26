<script setup lang="ts">
withDefaults(defineProps<{ direction?: 'up' | 'down' }>(), { direction: 'up' })
</script>

<template>
  <span class="fvue-trend-pill" :class="`fvue-trend-pill--${direction}`">
    <slot />
  </span>
</template>

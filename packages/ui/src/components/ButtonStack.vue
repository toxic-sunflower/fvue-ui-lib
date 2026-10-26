<script setup lang="ts">
withDefaults(defineProps<{ direction?: 'horizontal' | 'vertical' }>(), { direction: 'horizontal' })
</script>

<template>
  <div class="fvue-btn-stack" :class="`fvue-btn-stack--${direction}`">
    <slot />
  </div>
</template>

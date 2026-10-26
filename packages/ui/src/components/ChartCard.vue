<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {},
)
</script>

<template>
  <div class="fvue-card fvue-chart-card">
    <div v-if="title || description || $slots.header" class="fvue-card__header">
      <slot name="header" />
      <p v-if="title" class="fvue-card__title">{{ title }}</p>
      <p v-if="description" class="fvue-card__description">{{ description }}</p>
    </div>
    <div class="fvue-card__content"><slot /></div>
    <div v-if="$slots.footer" class="fvue-card__footer"><slot name="footer" /></div>
  </div>
</template>

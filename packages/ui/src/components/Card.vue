<script setup lang="ts">
</script>

<template>
  <div class="fvue-card">
    <div v-if="$slots.header || $slots.title" class="fvue-card__header">
      <slot name="header" />
      <slot name="title" />
    </div>
    <div v-if="$slots.description" class="fvue-card__description"><slot name="description" /></div>
    <div class="fvue-card__content"><slot /></div>
    <div v-if="$slots.footer" class="fvue-card__footer"><slot name="footer" /></div>
  </div>
</template>

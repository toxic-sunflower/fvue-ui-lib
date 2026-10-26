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
  <div class="fvue-empty">
    <div v-if="$slots.media" class="fvue-empty__media"><slot name="media" /></div>
    <p v-if="title" class="fvue-empty__title">{{ title }}</p>
    <p v-if="description" class="fvue-empty__description">{{ description }}</p>
    <div v-if="$slots.actions" class="fvue-empty__actions"><slot name="actions" /></div>
    <slot />
  </div>
</template>

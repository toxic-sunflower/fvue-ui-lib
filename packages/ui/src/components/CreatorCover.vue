<script setup lang="ts">
withDefaults(
  defineProps<{
    coverSrc?: string
    name?: string
    tagline?: string
    status?: string
  }>(),
  {},
)
</script>

<template>
  <div class="fvue-creator-cover">
    <div class="fvue-creator-cover__backdrop" aria-hidden="true" />
    <img v-if="coverSrc" class="fvue-creator-cover__img" :src="coverSrc" :alt="name ?? 'Cover'" />
    <span v-if="status" class="fvue-badge fvue-badge--brand fvue-badge--sm">{{ status }}</span>
    <p class="fvue-creator-cover__name"><slot name="name">{{ name }}</slot></p>
    <p v-if="tagline || $slots.tagline" class="fvue-creator-cover__tagline"><slot name="tagline">{{ tagline }}</slot></p>
    <div v-if="$slots.action" class="fvue-creator-cover__action"><slot name="action" /></div>
  </div>
</template>

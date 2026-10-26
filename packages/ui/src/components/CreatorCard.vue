<script setup lang="ts">
import Avatar from './Avatar.vue'

withDefaults(
  defineProps<{
    backgroundSrc?: string
    avatarSrc?: string
    name?: string
    tagline?: string
  }>(),
  {},
)
</script>

<template>
  <div class="fvue-creator-card">
    <div class="fvue-creator-card__bg" :style="backgroundSrc ? { backgroundImage: `url(${backgroundSrc})` } : undefined" aria-hidden="true" />
    <div class="fvue-creator-card__body">
      <Avatar :src="avatarSrc" :name="name" :size="56" />
      <p class="fvue-creator-card__name"><slot name="name">{{ name }}</slot></p>
      <p v-if="tagline || $slots.tagline" class="fvue-creator-card__tagline"><slot name="tagline">{{ tagline }}</slot></p>
      <div v-if="$slots.actions" class="fvue-creator-card__actions"><slot name="actions" /></div>
    </div>
  </div>
</template>

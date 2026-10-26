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
  <div class="fvue-creator-tile">
    <div class="fvue-creator-tile__bg" :style="backgroundSrc ? { backgroundImage: `url(${backgroundSrc})` } : undefined" aria-hidden="true" />
    <div class="fvue-creator-tile__row">
      <Avatar :src="avatarSrc" :name="name" :size="40" />
      <div class="fvue-creator-tile__meta">
        <p class="fvue-creator-tile__name"><slot name="name">{{ name }}</slot></p>
        <p v-if="tagline || $slots.tagline" class="fvue-creator-tile__tagline"><slot name="tagline">{{ tagline }}</slot></p>
      </div>
      <div v-if="$slots.action" class="fvue-creator-tile__action"><slot name="action" /></div>
    </div>
  </div>
</template>

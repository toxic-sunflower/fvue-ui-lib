<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
    href?: string
  }>(),
  { href: '#' },
)
</script>

<template>
  <a :href="href" class="fvue-chat-embed">
    <div v-if="$slots.badge" class="fvue-chat-embed__badge"><slot name="badge" /></div>
    <div class="fvue-chat-embed__body">
      <p v-if="title" class="fvue-chat-embed__title">{{ title }}</p>
      <p v-if="description" class="fvue-chat-embed__description">{{ description }}</p>
      <slot />
    </div>
  </a>
</template>

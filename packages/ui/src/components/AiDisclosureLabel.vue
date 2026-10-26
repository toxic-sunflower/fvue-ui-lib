<script setup lang="ts">
withDefaults(defineProps<{ text?: string }>(), { text: 'Created with AI' })
</script>

<template>
  <span class="fvue-ai-label" role="note">
    <span class="fvue-ai-badge" aria-hidden="true">AI</span>
    <slot>{{ text }}</slot>
  </span>
</template>

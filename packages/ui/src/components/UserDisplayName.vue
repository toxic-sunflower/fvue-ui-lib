<script setup lang="ts">
withDefaults(
  defineProps<{
    name?: string
    verified?: boolean
    ambassador?: boolean
    online?: boolean
  }>(),
  { verified: false, ambassador: false, online: false },
)
</script>

<template>
  <span class="fvue-user-name">
    <slot>{{ name }}</slot>
    <span v-if="verified" class="fvue-user-name__badge" role="img" aria-label="Verified">✓</span>
    <span v-if="ambassador" class="fvue-user-name__badge" role="img" aria-label="Ambassador">★</span>
    <span v-if="online" class="fvue-online-dot" style="width: 8px; height: 8px;" aria-hidden="true" />
  </span>
</template>

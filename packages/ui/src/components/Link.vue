<script setup lang="ts">
withDefaults(defineProps<{ href?: string; underline?: boolean }>(), { href: '#', underline: true })
</script>

<template>
  <a :href="href" class="fvue-link" :class="!underline && 'fvue-link--plain'">
    <slot />
  </a>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ lines?: number }>(), { lines: 3 })
</script>

<template>
  <div class="fvue-skeleton" aria-hidden="true">
    <div v-for="i in lines" :key="i" class="fvue-skeleton__line" />
  </div>
</template>

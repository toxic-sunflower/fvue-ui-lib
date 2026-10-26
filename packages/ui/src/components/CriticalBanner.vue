<script setup lang="ts">
withDefaults(defineProps<{ title?: string }>(), {})
defineEmits<{ action: [] }>()
</script>

<template>
  <div class="fvue-alert fvue-alert--error fvue-critical-banner" role="alert">
    <div class="fvue-alert__body">
      <p v-if="title" class="fvue-alert__title">{{ title }}</p>
      <div class="fvue-alert__content"><slot /></div>
      <div v-if="$slots.action" class="fvue-alert__action"><slot name="action" /></div>
    </div>
  </div>
</template>

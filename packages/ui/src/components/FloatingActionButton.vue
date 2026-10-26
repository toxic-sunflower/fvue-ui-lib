<script setup lang="ts">
withDefaults(defineProps<{ label?: string; disabled?: boolean }>(), { disabled: false })
defineEmits<{ click: [event: MouseEvent] }>()
</script>

<template>
  <button type="button" class="fvue-fab" :disabled="disabled" :aria-label="label" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

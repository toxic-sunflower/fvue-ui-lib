<script setup lang="ts">
withDefaults(
  defineProps<{ label?: string; price?: string; discount?: string; disabled?: boolean; loading?: boolean }>(),
  { disabled: false, loading: false },
)
defineEmits<{ click: [event: MouseEvent] }>()
</script>

<template>
  <button type="button" class="fvue-btn fvue-btn--brand fvue-btn--40" :disabled="disabled || loading" @click="$emit('click', $event)">
    <slot>{{ label }}</slot>
    <span v-if="discount" class="fvue-btn__discount">{{ discount }}</span>
    <span v-if="price" class="fvue-btn__price">{{ price }}</span>
  </button>
</template>

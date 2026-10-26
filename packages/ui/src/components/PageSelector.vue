<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: number
    defaultValue?: number
    total?: number
    prevLabel?: string
    nextLabel?: string
  }>(),
  { defaultValue: 1, total: 1, prevLabel: 'Previous page', nextLabel: 'Next page' },
)

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const page = computed(() => props.modelValue ?? props.defaultValue)

function go(n: number) {
  if (n >= 1 && n <= props.total) emit('update:modelValue', n)
}
</script>

<template>
  <div class="fvue-page-selector">
    <button type="button" class="fvue-icon-btn fvue-icon-btn--32" :disabled="page <= 1" :aria-label="prevLabel" @click="go(page - 1)">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M10 3 5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <span class="fvue-page-selector__label" aria-live="polite">{{ page }} of {{ total }}</span>
    <button type="button" class="fvue-icon-btn fvue-icon-btn--32" :disabled="page >= total" :aria-label="nextLabel" @click="go(page + 1)">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>

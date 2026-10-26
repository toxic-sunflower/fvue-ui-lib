<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: number
    defaultValue?: number
    total?: number
  }>(),
  { defaultValue: 1, total: 1 },
)

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const page = computed(() => props.modelValue ?? props.defaultValue)

function go(n: number) {
  if (n >= 1 && n <= props.total) emit('update:modelValue', n)
}
</script>

<template>
  <div class="fvue-table-pagination">
    <button type="button" class="fvue-btn fvue-btn--32 fvue-btn--tertiary" :disabled="page <= 1" @click="go(page - 1)">
      Previous
    </button>
    <span class="fvue-table-pagination__label" aria-live="polite">Page {{ page }} of {{ total }}</span>
    <button type="button" class="fvue-btn fvue-btn--32 fvue-btn--tertiary" :disabled="page >= total" @click="go(page + 1)">
      Next
    </button>
  </div>
</template>

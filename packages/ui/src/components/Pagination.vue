<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: number
    defaultValue?: number
    total?: number
    siblingCount?: number
    prevLabel?: string
    nextLabel?: string
  }>(),
  { defaultValue: 1, total: 1, siblingCount: 1, prevLabel: 'Previous page', nextLabel: 'Next page' },
)

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const page = computed(() => props.modelValue ?? props.defaultValue)

const pages = computed(() => {
  const list: (number | '…')[] = []
  const { total, siblingCount } = props
  const p = page.value
  const start = Math.max(1, p - siblingCount)
  const end = Math.min(total, p + siblingCount)
  if (start > 1) {
    list.push(1)
    if (start > 2) list.push('…')
  }
  for (let i = start; i <= end; i++) list.push(i)
  if (end < total) {
    if (end < total - 1) list.push('…')
    list.push(total)
  }
  return list
})

function go(n: number) {
  if (n >= 1 && n <= props.total) emit('update:modelValue', n)
}
</script>

<template>
  <nav class="fvue-pagination" aria-label="Pagination">
    <button type="button" class="fvue-icon-btn fvue-icon-btn--32" :disabled="page <= 1" :aria-label="prevLabel" @click="go(page - 1)">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M10 3 5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <template v-for="(n, i) in pages" :key="`${n}-${i}`">
      <span v-if="n === '…'" class="fvue-pagination__ellipsis" aria-hidden="true">…</span>
      <button
        v-else
        type="button"
        class="fvue-pagination__page"
        :class="n === page && 'fvue-pagination__page--active'"
        :aria-label="`Page ${n}`"
        :aria-current="n === page ? 'page' : undefined"
        @click="go(n)"
      >
        {{ n }}
      </button>
    </template>
    <button type="button" class="fvue-icon-btn fvue-icon-btn--32" :disabled="page >= total" :aria-label="nextLabel" @click="go(page + 1)">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </nav>
</template>

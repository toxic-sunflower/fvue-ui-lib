<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    items?: string[]
    interval?: number
    activeIndex?: number
  }>(),
  { items: () => [], interval: 3000 },
)

const emit = defineEmits<{ 'update:activeIndex': [value: number] }>()

const inner = ref(props.activeIndex ?? 0)
watch(
  () => props.activeIndex,
  (v) => {
    if (v !== undefined) inner.value = v
  },
)

let timer: ReturnType<typeof setInterval> | undefined
function tick() {
  if (!props.items.length) return
  inner.value = (inner.value + 1) % props.items.length
  emit('update:activeIndex', inner.value)
}
onMounted(() => {
  if (props.activeIndex === undefined) timer = setInterval(tick, props.interval)
})
onUnmounted(() => clearInterval(timer))

const current = computed(() => props.items[inner.value] ?? '')
</script>

<template>
  <span class="fvue-cycling-text" aria-live="polite">
    <span :key="inner" class="fvue-cycling-text__item">{{ current }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    value?: number
    mode?: 'roll' | 'count'
    duration?: number
  }>(),
  { value: 0, mode: 'roll', duration: 600 },
)

const display = ref(props.value)
let raf = 0
watch(
  () => props.value,
  (to, from) => {
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / props.duration)
      display.value = from + (to - from) * t
      if (t < 1) raf = requestAnimationFrame(step)
    }
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(step)
  },
)
const text = computed(() => (Number.isInteger(props.value) ? Math.round(display.value).toString() : display.value.toFixed(1)))
</script>

<template>
  <span class="fvue-animated-number" aria-live="polite">{{ text }}</span>
</template>

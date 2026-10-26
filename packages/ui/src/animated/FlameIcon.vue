<script setup lang="ts">
import { ref } from 'vue'
import type { IconSize } from '../types'

const props = withDefaults(
  defineProps<{ size?: IconSize; playing?: boolean; label?: string }>(),
  { size: 24, playing: false },
)

const active = ref(false)

function startAnimation() {
  active.value = false
  requestAnimationFrame(() => {
    active.value = true
  })
}

function stopAnimation() {
  active.value = false
}

defineExpose({ startAnimation, stopAnimation })
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    :class="['fvue-animated-icon', (playing || active) && 'fvue-animated-icon--playing']"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : true"
    @mouseenter="startAnimation"
    @mouseleave="stopAnimation"
  >
      <path d="M8.9 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
</template>

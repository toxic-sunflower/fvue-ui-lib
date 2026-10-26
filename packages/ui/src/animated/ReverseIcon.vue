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
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
  </svg>
</template>

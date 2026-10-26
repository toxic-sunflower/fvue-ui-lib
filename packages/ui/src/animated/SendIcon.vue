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
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" pathLength="1" class="fvue-animated-icon__draw" />
      <path d="m21.854 2.147-10.94 10.939" pathLength="1" class="fvue-animated-icon__draw" />
      <path d="M -3 28 C -0.5 26.8 1.6 24.6 3.3 22 C 4.8 19.7 5.2 17.6 4.2 16.1 C 3.2 14.7 1.4 14.5 0.3 15.8 C -0.9 17.2 -0.6 19.4 1.2 20.4 C 3.4 21.5 6.4 19.4 9 15.8" pathLength="1" class="fvue-animated-icon__draw" />
  </svg>
</template>

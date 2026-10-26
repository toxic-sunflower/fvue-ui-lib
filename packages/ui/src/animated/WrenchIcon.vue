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
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z" />
  </svg>
</template>

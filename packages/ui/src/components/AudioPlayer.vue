<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    src?: string
    duration?: number
    playing?: boolean
    defaultPlaying?: boolean
    waveform?: number[]
  }>(),
  { duration: 0, defaultPlaying: false },
)

const emit = defineEmits<{ 'update:playing': [value: boolean] }>()

const audio = ref<HTMLAudioElement | null>(null)
const innerPlaying = ref(props.defaultPlaying)
watch(
  () => props.playing,
  (v) => {
    if (v !== undefined) innerPlaying.value = v
  },
)
const isPlaying = computed(() => props.playing ?? innerPlaying.value)
const elapsed = ref(0)

function fmt(s: number) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${String(sec).padStart(2, '0')}`
}

function onEnded() {
  innerPlaying.value = false
  emit('update:playing', false)
}

async function toggle() {
  const next = !isPlaying.value
  innerPlaying.value = next
  emit('update:playing', next)
  const el = audio.value
  if (!el || !props.src) return
  try {
    if (next) await el.play()
    else el.pause()
  } catch {
    /* no real audio in preview */
  }
}

const bars = computed(() => props.waveform ?? Array.from({ length: 32 }, () => 0.2))
</script>

<template>
  <div class="fvue-audio">
    <audio v-if="src" ref="audio" :src="src" @timeupdate="elapsed = (audio?.currentTime ?? 0)" @ended="onEnded" />
    <button type="button" class="fvue-btn fvue-btn--32" style="border-radius: 9999px; padding: 0 8px;" :aria-label="isPlaying ? 'Pause' : 'Play'" :aria-pressed="isPlaying" @click="toggle">
      <svg v-if="!isPlaying" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M3 2.5v7l6-3.5-6-3.5Z" fill="currentColor" />
      </svg>
      <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M3.5 2.5v7M8.5 2.5v7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
      </svg>
    </button>
    <span class="fvue-chat__wave" aria-hidden="true">
      <span v-for="(h, i) in bars" :key="i" class="fvue-chat__bar" :class="isPlaying && 'fvue-chat__bar--active'" :style="{ height: `${Math.max(4, Math.round(h * 24))}px` }" />
    </span>
    <span class="fvue-audio__time">{{ fmt(elapsed) }} / {{ fmt(duration) }}</span>
  </div>
</template>

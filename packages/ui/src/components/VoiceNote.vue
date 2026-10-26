<script setup lang="ts">
import AudioPlayer from './AudioPlayer.vue'

withDefaults(
  defineProps<{
    src?: string
    duration?: number
    playing?: boolean
    defaultPlaying?: boolean
    waveform?: number[]
    time?: string
  }>(),
  { defaultPlaying: false },
)

const emit = defineEmits<{ 'update:playing': [value: boolean] }>()

function onPlaying(v: boolean) {
  emit('update:playing', v)
}
</script>

<template>
  <div class="fvue-voice-note">
    <AudioPlayer :src="src" :duration="duration" :playing="playing" :default-playing="defaultPlaying" :waveform="waveform" @update:playing="onPlaying" />
    <span v-if="time" class="fvue-voice-note__time">{{ time }}</span>
  </div>
</template>

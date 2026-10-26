<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ChatMessageStatus, ChatMessageUser, ChatMessageVariant } from '../types'
import Avatar from './Avatar.vue'
import { cn } from '../cn'

const props = withDefaults(
  defineProps<{
    user?: ChatMessageUser
    variant?: ChatMessageVariant
    message?: string
    time?: string
    status?: ChatMessageStatus
    avatarSrc?: string
    avatarAlt?: string
    avatarFallback?: string
    showAvatar?: boolean
    online?: boolean
    audioDuration?: string
    waveform?: number[]
    playing?: boolean
    defaultPlaying?: boolean
    playLabel?: string
    pauseLabel?: string
    typingLabel?: string
    deletedLabel?: string
  }>(),
  {
    user: 'receiver',
    variant: 'text',
    status: 'delivered',
    showAvatar: true,
    online: false,
    audioDuration: '0:00',
    playLabel: 'Play',
    pauseLabel: 'Pause',
    typingLabel: 'Typing',
    deletedLabel: 'Message deleted',
    defaultPlaying: false,
  },
)

const emit = defineEmits<{ 'update:playing': [value: boolean] }>()

const innerPlaying = ref(props.defaultPlaying)
watch(
  () => props.playing,
  (v) => {
    if (v !== undefined) innerPlaying.value = v
  },
)
const isPlaying = computed(() => props.playing ?? innerPlaying.value)

function toggle() {
  const next = !isPlaying.value
  innerPlaying.value = next
  emit('update:playing', next)
}

const bars = computed(() => props.waveform ?? Array.from({ length: 24 }, () => 0.15))
</script>

<template>
  <div :class="cn('fvue-chat', `fvue-chat--${user}`)">
    <span v-if="user === 'receiver' && showAvatar" class="fvue-chat__avatar">
      <Avatar :src="avatarSrc" :alt="avatarAlt" :fallback="avatarFallback" :size="28" :online="online" />
    </span>
    <span v-else-if="user === 'receiver'" class="fvue-chat__avatar" style="width: 28px;" aria-hidden="true" />
    <div class="fvue-chat__bubble">
      <template v-if="variant === 'typing'">
        <span class="fvue-chat__typing" role="status" :aria-label="typingLabel"><span /><span /><span /></span>
      </template>
      <template v-else-if="variant === 'deleted'">
        <span style="opacity: 0.7;">{{ deletedLabel }}</span>
      </template>
      <template v-else-if="variant === 'audio'">
        <span style="display: flex; align-items: center; gap: 8px;">
          <button
            type="button"
            class="fvue-btn fvue-btn--32"
            style="border-radius: 9999px; padding: 0 8px;"
            :aria-label="isPlaying ? pauseLabel : playLabel"
            :aria-pressed="isPlaying"
            @click="toggle"
          >
            <svg v-if="!isPlaying" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 2.5v7l6-3.5-6-3.5Z" fill="currentColor" />
            </svg>
            <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3.5 2.5v7M8.5 2.5v7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </button>
          <span class="fvue-chat__wave" aria-hidden="true">
            <span
              v-for="(h, i) in bars"
              :key="i"
              class="fvue-chat__bar"
              :class="isPlaying && 'fvue-chat__bar--active'"
              :style="{ height: `${Math.max(4, Math.round(h * 24))}px` }"
            />
          </span>
          <span style="font-size: 12px;">{{ audioDuration }}</span>
        </span>
      </template>
      <template v-else>
        <slot>{{ message }}</slot>
      </template>
      <div v-if="time || (user === 'sender' && variant === 'text')" class="fvue-chat__meta">
        <span v-if="time">{{ time }}</span>
        <span v-if="user === 'sender'" class="fvue-chat__ticks" role="img" :aria-label="status">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2.5 8.5 5.5 11.5 10 5M7 10.5l1.5 1.5L13.5 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

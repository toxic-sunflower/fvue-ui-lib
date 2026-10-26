<script setup lang="ts">
import Avatar from './Avatar.vue'

withDefaults(
  defineProps<{
    avatarSrc?: string
    name?: string
    handle?: string
    verified?: boolean
    online?: boolean
    muted?: boolean
  }>(),
  { verified: false, online: false, muted: false },
)
</script>

<template>
  <div class="fvue-user-item">
    <Avatar :src="avatarSrc" :name="name" :size="40" :online="online" />
    <div class="fvue-user-item__body">
      <span class="fvue-user-item__name">
        <slot name="name">{{ name }}</slot>
        <svg v-if="verified" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-label="Verified" role="img">
          <circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.15" />
          <path d="m5.5 8.2 1.8 1.8 3.2-3.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <span v-if="handle || $slots.handle" class="fvue-user-item__handle">
        <slot name="handle">@{{ handle }}</slot>
      </span>
    </div>
    <div v-if="$slots.trailing" class="fvue-user-item__trailing"><slot name="trailing" /></div>
    <span v-if="muted" class="fvue-field__helper">Muted</span>
  </div>
</template>

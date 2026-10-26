<script setup lang="ts">
import { AvatarFallback, AvatarImage, AvatarRoot } from 'reka-ui'
import { getInitials } from '../getInitials'

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    name?: string
    fallback?: string
    size?: number
    online?: boolean
    blur?: boolean
  }>(),
  { size: 40, online: false, blur: false },
)

const initials = () => props.fallback ?? (props.name ? getInitials(props.name) : (props.alt ?? '?').slice(0, 2).toUpperCase())
</script>

<template>
  <AvatarRoot
    class="fvue-avatar"
    :class="blur && 'fvue-avatar--blur'"
    :style="{ width: `${size}px`, height: `${size}px`, fontSize: `${Math.max(10, Math.round(size / 3))}px` }"
  >
    <AvatarImage v-if="src" :src="src" :alt="alt ?? name ?? 'Avatar'" />
    <AvatarFallback class="fvue-avatar__fallback">
      <slot name="fallback">{{ initials() }}</slot>
    </AvatarFallback>
    <span v-if="online" class="fvue-avatar__online" aria-label="Online" role="status" />
  </AvatarRoot>
</template>

<script setup lang="ts">
import { cn } from '../cn'
import type { BadgeSize, BadgeVariant } from '../types'

withDefaults(defineProps<{ variant?: BadgeVariant; size?: BadgeSize }>(), { variant: 'neutral', size: 'md' })
</script>

<template>
  <span :class="cn('fvue-badge', `fvue-badge--${variant}`, `fvue-badge--${size}`)">
    <slot />
  </span>
</template>

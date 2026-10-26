<script setup lang="ts">
import { cn } from '../cn'

withDefaults(defineProps<{ variant?: 'default' | 'beta' | 'subscriber' }>(), { variant: 'default' })
</script>

<template>
  <span :class="cn('fvue-pill', variant !== 'default' && `fvue-pill--${variant}`)">
    <slot />
  </span>
</template>

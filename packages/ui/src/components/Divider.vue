<script setup lang="ts">
import { Separator } from 'reka-ui'

withDefaults(defineProps<{ orientation?: 'horizontal' | 'vertical'; label?: string }>(), { orientation: 'horizontal' })
</script>

<template>
  <Separator class="fvue-divider" :orientation="orientation" :aria-label="label" />
</template>

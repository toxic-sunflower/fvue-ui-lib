<script setup lang="ts">
import Tooltip from './Tooltip.vue'

withDefaults(
  defineProps<{
    label?: string
    content?: string
    side?: 'top' | 'right' | 'bottom' | 'left'
  }>(),
  { side: 'top' },
)
</script>

<template>
  <Tooltip :label="content" :side="side">
    <span class="fvue-tooltip-label" tabindex="0"><slot>{{ label }}</slot></span>
    <template #content><slot name="content">{{ content }}</slot></template>
  </Tooltip>
</template>

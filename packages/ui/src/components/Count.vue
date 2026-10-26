<script setup lang="ts">
withDefaults(
  defineProps<{
    count?: number | string
    max?: number
    label?: string
  }>(),
  { max: 99 },
)
</script>

<template>
  <span class="fvue-count" role="status" :aria-label="label ?? `Count ${count}`">
    <slot>{{ typeof count === 'number' && count > max ? `${max}+` : count }}</slot>
  </span>
</template>

<script setup lang="ts">
import ProfileStatus from './ProfileStatus.vue'

withDefaults(
  defineProps<{
    active?: boolean
    label?: string
  }>(),
  { active: false },
)
</script>

<template>
  <ProfileStatus :active="active" :active-label="label ?? 'Online'" :inactive-label="label ?? 'Offline'" />
</template>

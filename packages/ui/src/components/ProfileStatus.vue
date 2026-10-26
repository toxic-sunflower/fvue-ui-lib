<script setup lang="ts">
withDefaults(
  defineProps<{
    active?: boolean
    activeLabel?: string
    inactiveLabel?: string
  }>(),
  { active: false, activeLabel: 'Online', inactiveLabel: 'Offline' },
)
</script>

<template>
  <span class="fvue-profile-status" role="status" :aria-label="active ? activeLabel : inactiveLabel">
    <span class="fvue-online-dot" :style="{ opacity: active ? 1 : 0.3 }" aria-hidden="true" />
    {{ active ? activeLabel : inactiveLabel }}
  </span>
</template>

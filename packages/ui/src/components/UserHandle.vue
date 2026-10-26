<script setup lang="ts">
withDefaults(defineProps<{ handle?: string }>(), {})
</script>

<template>
  <span class="fvue-user-handle"><slot>@{{ handle }}</slot></span>
</template>

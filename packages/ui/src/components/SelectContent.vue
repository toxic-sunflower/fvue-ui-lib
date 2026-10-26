<script setup lang="ts">
import { SelectContent, SelectPortal, SelectViewport } from 'reka-ui'

withDefaults(defineProps<{ position?: 'item-aligned' | 'popper' }>(), { position: 'popper' })
</script>

<template>
  <SelectPortal>
    <SelectContent class="fvue-select-content" :position="position">
      <SelectViewport>
        <slot />
      </SelectViewport>
    </SelectContent>
  </SelectPortal>
</template>

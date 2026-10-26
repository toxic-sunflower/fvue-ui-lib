<script setup lang="ts">
import { computed } from 'vue'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'

const props = withDefaults(
  defineProps<{
    open?: boolean
    defaultOpen?: boolean
  }>(),
  { open: undefined, defaultOpen: undefined },
)

const emit = defineEmits<{ 'update:open': [value: boolean] }>()

const rootProps = computed(() => ({
  ...(props.open !== undefined ? { open: props.open } : {}),
  ...(props.defaultOpen !== undefined ? { defaultOpen: props.defaultOpen } : {}),
}))

function onOpenChange(v: boolean) {
  emit('update:open', v)
}
</script>

<template>
  <PopoverRoot v-bind="rootProps" @update:open="onOpenChange">
    <PopoverTrigger as-child>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent class="fvue-infobox" :side-offset="8">
        <slot />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

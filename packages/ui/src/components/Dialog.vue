<script setup lang="ts">
import { computed } from 'vue'
import { DialogRoot } from 'reka-ui'

const props = withDefaults(
  defineProps<{
    open?: boolean
    defaultOpen?: boolean
    modal?: boolean
  }>(),
  { open: undefined, defaultOpen: undefined, modal: true },
)

const emit = defineEmits<{ 'update:open': [value: boolean] }>()

function onOpenChange(value: boolean) {
  emit('update:open', value)
}

const rootProps = computed(() => ({
  ...(props.open !== undefined ? { open: props.open } : {}),
  ...(props.defaultOpen !== undefined ? { defaultOpen: props.defaultOpen } : {}),
  modal: props.modal,
}))
</script>

<template>
  <DialogRoot v-bind="rootProps" @update:open="onOpenChange">
    <slot />
  </DialogRoot>
</template>

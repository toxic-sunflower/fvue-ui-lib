<script setup lang="ts">
import { computed } from 'vue'
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'reka-ui'

const props = withDefaults(
  defineProps<{
    open?: boolean
    defaultOpen?: boolean
    modal?: boolean
  }>(),
  { open: undefined, defaultOpen: undefined, modal: true },
)

const emit = defineEmits<{ 'update:open': [value: boolean] }>()

const rootProps = computed(() => ({
  ...(props.open !== undefined ? { open: props.open } : {}),
  ...(props.defaultOpen !== undefined ? { defaultOpen: props.defaultOpen } : {}),
  modal: props.modal,
}))

function onOpenChange(v: boolean) {
  emit('update:open', v)
}
</script>

<template>
  <DropdownMenuRoot v-bind="rootProps" @update:open="onOpenChange">
    <slot />
  </DropdownMenuRoot>
</template>

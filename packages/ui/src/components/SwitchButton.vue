<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ modelValue?: boolean; defaultValue?: boolean; label?: string; disabled?: boolean }>(), {
  disabled: false,
})
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const inner = computed(() => props.modelValue ?? props.defaultValue ?? false)
function toggle() {
  if (props.disabled) return
  emit('update:modelValue', !inner.value)
}
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="inner"
    :aria-label="label"
    class="fvue-switch-btn"
    :class="inner && 'fvue-switch-btn--on'"
    :disabled="disabled"
    @click="toggle"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

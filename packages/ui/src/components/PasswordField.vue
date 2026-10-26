<script setup lang="ts">
import { ref } from 'vue'
import TextField from './TextField.vue'

withDefaults(
  defineProps<{
    modelValue?: string
    label?: string
    helperText?: string
    error?: boolean
    errorMessage?: string
    placeholder?: string
    disabled?: boolean
    showLabel?: string
    hideLabel?: string
  }>(),
  { disabled: false, error: false, showLabel: 'Show password', hideLabel: 'Hide password' },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

function onUpdate(v: string) {
  emit('update:modelValue', v)
}

const visible = ref(false)
</script>

<template>
  <TextField
    :model-value="modelValue"
    :label="label"
    :helper-text="helperText"
    :error="error"
    :error-message="errorMessage"
    :placeholder="placeholder"
    :disabled="disabled"
    :type="visible ? 'text' : 'password'"
    @update:model-value="onUpdate"
  >
    <template #rightIcon>
      <button type="button" class="fvue-dialog__close" :aria-label="visible ? hideLabel : showLabel" :aria-pressed="visible" @click="visible = !visible">
        <svg v-if="visible" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 8s2.2-3.5 6-3.5S14 8 14 8s-2.2 3.5-6 3.5S2 8 2 8Z" stroke="currentColor" stroke-width="1.5" />
          <circle cx="8" cy="8" r="1.8" stroke="currentColor" stroke-width="1.5" />
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 8s2.2-3.5 6-3.5c1.4 0 2.6.5 3.6 1.2M14 8s-2.2 3.5-6 3.5c-1.4 0-2.6-.5-3.6-1.2M2.5 2.5l11 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </button>
    </template>
  </TextField>
</template>

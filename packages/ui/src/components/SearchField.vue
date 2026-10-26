<script setup lang="ts">
import TextField from './TextField.vue'

withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    disabled?: boolean
    clearLabel?: string
  }>(),
  { placeholder: 'Search', disabled: false, clearLabel: 'Clear search' },
)

const emit = defineEmits<{ 'update:modelValue': [value: string]; clear: [] }>()

function onUpdate(v: string) {
  emit('update:modelValue', v)
}
function onClear() {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <TextField :model-value="modelValue" :placeholder="placeholder" :disabled="disabled" type="search" @update:model-value="onUpdate">
    <template #leftIcon>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5" />
        <path d="m10.5 10.5 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </template>
    <template v-if="modelValue" #rightIcon>
      <button type="button" class="fvue-dialog__close" :aria-label="clearLabel" @click="onClear">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="m3 3 6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </button>
    </template>
  </TextField>
</template>

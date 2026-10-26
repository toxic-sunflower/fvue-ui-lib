<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    defaultValue?: string
    placeholder?: string
    disabled?: boolean
    submitLabel?: string
  }>(),
  { placeholder: 'Message…', disabled: false, submitLabel: 'Send' },
)

const emit = defineEmits<{ 'update:modelValue': [value: string]; submit: [value: string]; attach: [] }>()

function onAttach() {
  emit('attach')
}

const inner = ref(props.defaultValue ?? props.modelValue ?? '')
watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) inner.value = v
  },
)

function onInput(e: Event) {
  const v = (e.target as HTMLTextAreaElement).value
  inner.value = v
  emit('update:modelValue', v)
}

function onSubmit() {
  if (!inner.value.trim() || props.disabled) return
  emit('submit', inner.value)
  inner.value = ''
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="fvue-chat-input">
    <button v-if="$slots.attach" type="button" class="fvue-dialog__close" aria-label="Attach file" @click="onAttach">
      <slot name="attach">+</slot>
    </button>
    <textarea
      :value="inner"
      :placeholder="placeholder"
      :disabled="disabled"
      rows="1"
      aria-label="Message"
      @input="onInput"
      @keydown.enter.exact.prevent="onSubmit"
    />
    <div v-if="$slots.controls" class="fvue-chat-input__controls"><slot name="controls" /></div>
    <button type="button" class="fvue-btn fvue-btn--primary fvue-btn--32" :disabled="disabled || !inner.trim()" :aria-label="submitLabel" @click="onSubmit">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M14.5 1.5 7.3 8.7M14.5 1.5 10 14.5l-2.7-5.8L1.5 5.6l13-4.1Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>

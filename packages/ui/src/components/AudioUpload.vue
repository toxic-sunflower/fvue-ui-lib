<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
  defineProps<{
    accept?: string
    disabled?: boolean
    label?: string
  }>(),
  { accept: 'audio/*', disabled: false, label: 'Upload audio' },
)

const emit = defineEmits<{ file: [file: File] }>()

const input = ref<HTMLInputElement | null>(null)

function onChange(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0]
  if (f) emit('file', f)
}
</script>

<template>
  <div class="fvue-audio-upload">
    <input ref="input" type="file" :accept="accept" :disabled="disabled" class="fvue-audio-upload__input" :aria-label="label" @change="onChange" />
    <button type="button" class="fvue-btn fvue-btn--secondary fvue-btn--40" :disabled="disabled" @click="input?.click()">
      <slot>{{ label }}</slot>
    </button>
    <slot name="record" />
  </div>
</template>

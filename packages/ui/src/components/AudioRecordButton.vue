<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
  defineProps<{
    recording?: boolean
    disabled?: boolean
    startLabel?: string
    stopLabel?: string
  }>(),
  { recording: false, disabled: false, startLabel: 'Start recording', stopLabel: 'Stop recording' },
)

const emit = defineEmits<{ 'update:recording': [value: boolean]; blob: [blob: Blob] }>()

const inner = ref(false)

async function toggle() {
  if (typeof MediaRecorder === 'undefined') {
    inner.value = !inner.value
    emit('update:recording', inner.value)
    return
  }
  inner.value = !inner.value
  emit('update:recording', inner.value)
}
</script>

<template>
  <button
    type="button"
    class="fvue-btn fvue-btn--40"
    style="border-radius: 9999px; padding: 0 12px;"
    :disabled="disabled"
    :aria-label="inner ? stopLabel : startLabel"
    :aria-pressed="inner"
    @click="toggle"
  >
    <span class="fvue-record-dot" :class="inner && 'fvue-record-dot--on'" aria-hidden="true" />
  </button>
</template>

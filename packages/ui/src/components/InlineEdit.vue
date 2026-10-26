<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    defaultValue?: string
    placeholder?: string
  }>(),
  { placeholder: 'Click to edit' },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const editing = ref(false)
const inner = ref(props.defaultValue ?? props.modelValue ?? '')
watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) inner.value = v
  },
)

function commit() {
  editing.value = false
  emit('update:modelValue', inner.value)
}
</script>

<template>
  <button v-if="!editing" type="button" class="fvue-chip fvue-chip--dotted" @click="editing = true">
    <slot>{{ inner || placeholder }}</slot>
  </button>
  <input
    v-else
    v-model="inner"
    class="fvue-input fvue-input--32"
    @blur="commit"
    @keyup.enter="commit"
    @keyup.escape="editing = false"
  />
</template>

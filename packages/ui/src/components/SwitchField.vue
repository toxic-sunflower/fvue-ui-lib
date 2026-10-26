<script setup lang="ts">
import Switch from './Switch.vue'

withDefaults(
  defineProps<{
    modelValue?: boolean
    defaultValue?: boolean
    label?: string
    helperText?: string
    disabled?: boolean
    id?: string
  }>(),
  { disabled: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

function onUpdate(v: boolean) {
  emit('update:modelValue', v)
}
</script>

<template>
  <div class="fvue-check-field">
    <Switch :id="id" :model-value="modelValue" :default-value="defaultValue" :disabled="disabled" @update:model-value="onUpdate" />
    <div>
      <label v-if="label" :for="id" class="fvue-field__label">{{ label }}</label>
      <p v-if="helperText" class="fvue-field__helper">{{ helperText }}</p>
      <slot name="info" />
    </div>
  </div>
</template>

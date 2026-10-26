<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxRoot, ComboboxViewport } from 'reka-ui'

export interface AutocompleteOption {
  value: string
  label: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    modelValue?: string
    defaultValue?: string
    options?: AutocompleteOption[]
    label?: string
    placeholder?: string
    disabled?: boolean
    multiple?: boolean
  }>(),
  { options: () => [], disabled: false, multiple: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const open = ref(false)
const search = ref('')

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return props.options
  return props.options.filter((o) => o.label.toLowerCase().includes(q))
})

function onUpdate(v: string) {
  emit('update:modelValue', v)
  open.value = false
}

function onOpenChange(v: boolean) {
  open.value = v
}

watch(
  () => props.modelValue,
  () => {
    open.value = false
  },
)
</script>

<template>
  <div class="fvue-field">
    <label v-if="label" class="fvue-field__label">{{ label }}</label>
    <ComboboxRoot :model-value="modelValue" :default-value="defaultValue" :disabled="disabled" :open="open" @update:model-value="onUpdate" @update:open="onOpenChange">
      <ComboboxAnchor class="fvue-input fvue-input--40">
        <ComboboxInput v-model="search" :placeholder="placeholder" :disabled="disabled" />
      </ComboboxAnchor>
      <ComboboxContent class="fvue-select-content">
        <ComboboxViewport>
          <ComboboxEmpty class="fvue-field__helper">No results</ComboboxEmpty>
          <ComboboxItem v-for="o in filtered" :key="o.value" :value="o.value" :disabled="o.disabled" class="fvue-select-item">
            <span>{{ o.label }}</span>
          </ComboboxItem>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxRoot>
  </div>
</template>

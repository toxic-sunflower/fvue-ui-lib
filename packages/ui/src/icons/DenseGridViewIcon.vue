<script setup lang="ts">
import { computed } from 'vue'
import type { IconSize } from '../types'

const props = withDefaults(defineProps<{ size?: IconSize; filled?: boolean }>(), {
  size: 24,
  filled: false,
})

const VARIANTS = {"16":{"outlined":[{"d":"M5.18 2.333a.667.667 0 0 0-.667-.666H2.5a.667.667 0 0 0-.667.666v2c0 .369.299.667.667.667h2.013a.667.667 0 0 0 .667-.667zm0 4.334A.667.667 0 0 0 4.513 6H2.5a.667.667 0 0 0-.667.667V9c0 .368.299.667.667.667h2.013A.667.667 0 0 0 5.18 9zm0 4.666a.667.667 0 0 0-.667-.666H2.5a.667.667 0 0 0-.667.666v2c0 .368.299.667.667.667h2.013a.667.667 0 0 0 .667-.667zm4.667-9a.667.667 0 0 0-.667-.666H6.847a.667.667 0 0 0-.667.666v2c0 .369.299.667.667.667H9.18a.667.667 0 0 0 .667-.667zm4.32 0a.667.667 0 0 0-.667-.666h-1.987a.667.667 0 0 0-.666.666v2c0 .369.298.667.666.667H13.5a.667.667 0 0 0 .667-.667zm-4.32 4.334A.667.667 0 0 0 9.18 6H6.847a.667.667 0 0 0-.667.667V9c0 .368.299.667.667.667H9.18A.667.667 0 0 0 9.847 9zm0 4.666a.667.667 0 0 0-.667-.666H6.847a.667.667 0 0 0-.667.666v2c0 .368.299.667.667.667H9.18a.667.667 0 0 0 .667-.667zm4.32 0a.667.667 0 0 0-.667-.666h-1.987a.667.667 0 0 0-.666.666v2c0 .368.298.667.666.667H13.5a.667.667 0 0 0 .667-.667zm0-4.666A.667.667 0 0 0 13.5 6h-1.987a.667.667 0 0 0-.666.667V9c0 .368.298.667.666.667H13.5A.667.667 0 0 0 14.167 9z"}]},"24":{"outlined":[{"d":"M7.77 3.5a1 1 0 0 0-1-1H3.75a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3.02a1 1 0 0 0 1-1zm0 6.5a1 1 0 0 0-1-1H3.75a1 1 0 0 0-1 1v3.5a1 1 0 0 0 1 1h3.02a1 1 0 0 0 1-1zm0 7a1 1 0 0 0-1-1H3.75a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3.02a1 1 0 0 0 1-1zm7-13.5a1 1 0 0 0-1-1h-3.5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3.5a1 1 0 0 0 1-1zm6.48 0a1 1 0 0 0-1-1h-2.98a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h2.98a1 1 0 0 0 1-1zM14.77 10a1 1 0 0 0-1-1h-3.5a1 1 0 0 0-1 1v3.5a1 1 0 0 0 1 1h3.5a1 1 0 0 0 1-1zm0 7a1 1 0 0 0-1-1h-3.5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3.5a1 1 0 0 0 1-1zm6.48 0a1 1 0 0 0-1-1h-2.98a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h2.98a1 1 0 0 0 1-1zm0-7a1 1 0 0 0-1-1h-2.98a1 1 0 0 0-1 1v3.5a1 1 0 0 0 1 1h2.98a1 1 0 0 0 1-1z"}]},"32":{"outlined":[{"d":"M10.36 4.667c0-.737-.597-1.334-1.333-1.334H5c-.736 0-1.333.597-1.333 1.334v4C3.667 9.403 4.264 10 5 10h4.027c.736 0 1.333-.597 1.333-1.333zm0 8.666c0-.736-.597-1.333-1.333-1.333H5c-.736 0-1.333.597-1.333 1.333V18c0 .736.597 1.333 1.333 1.333h4.027c.736 0 1.333-.597 1.333-1.333zm0 9.334c0-.737-.597-1.334-1.333-1.334H5c-.736 0-1.333.597-1.333 1.334v4C3.667 27.403 4.264 28 5 28h4.027c.736 0 1.333-.597 1.333-1.333zm9.333-18c0-.737-.597-1.334-1.333-1.334h-4.667c-.736 0-1.333.597-1.333 1.334v4c0 .736.597 1.333 1.333 1.333h4.667c.736 0 1.333-.597 1.333-1.333zm8.64 0c0-.737-.597-1.334-1.333-1.334h-3.973c-.737 0-1.334.597-1.334 1.334v4c0 .736.597 1.333 1.334 1.333H27c.736 0 1.333-.597 1.333-1.333zm-8.64 8.666c0-.736-.597-1.333-1.333-1.333h-4.667c-.736 0-1.333.597-1.333 1.333V18c0 .736.597 1.333 1.333 1.333h4.667c.736 0 1.333-.597 1.333-1.333zm0 9.334c0-.737-.597-1.334-1.333-1.334h-4.667c-.736 0-1.333.597-1.333 1.334v4c0 .736.597 1.333 1.333 1.333h4.667c.736 0 1.333-.597 1.333-1.333zm8.64 0c0-.737-.597-1.334-1.333-1.334h-3.973c-.737 0-1.334.597-1.334 1.334v4c0 .736.597 1.333 1.334 1.333H27c.736 0 1.333-.597 1.333-1.333zm0-9.334c0-.736-.597-1.333-1.333-1.333h-3.973c-.737 0-1.334.597-1.334 1.333V18c0 .736.597 1.333 1.334 1.333H27c.736 0 1.333-.597 1.333-1.333z"}]}} as Record<number, { outlined: { d: string; sw?: number; eo?: boolean }[]; filled?: { d: string; sw?: number; eo?: boolean }[] }>

const current = computed(() => VARIANTS[props.size] ?? VARIANTS[24])
const showFilled = computed(() => !!(props.filled && current.value?.filled))
</script>

<template>
  <svg :viewBox="`0 0 ${size} ${size}`" :width="size" :height="size" fill="none" aria-hidden="true" class="fvue-icon">
    <g :class="['fvue-icon__layer', showFilled && 'fvue-icon__layer--hidden']">
      <path
        v-for="p in current?.outlined ?? []"
        :key="p.d"
        :d="p.d"
        :stroke="p.sw !== undefined ? 'currentColor' : undefined"
        :stroke-width="p.sw"
        stroke-linecap="round"
        stroke-linejoin="round"
        :fill="p.sw !== undefined ? undefined : 'currentColor'"
        :fill-rule="p.eo ? 'evenodd' : undefined"
        :clip-rule="p.eo ? 'evenodd' : undefined"
      />
    </g>
    <g v-if="current?.filled" :class="['fvue-icon__layer', showFilled ? undefined : 'fvue-icon__layer--hidden']">
      <path
        v-for="p in current.filled ?? []"
        :key="p.d"
        :d="p.d"
        :stroke="p.sw !== undefined ? 'currentColor' : undefined"
        :stroke-width="p.sw"
        stroke-linecap="round"
        stroke-linejoin="round"
        :fill="p.sw !== undefined ? undefined : 'currentColor'"
        :fill-rule="p.eo ? 'evenodd' : undefined"
        :clip-rule="p.eo ? 'evenodd' : undefined"
      />
    </g>
  </svg>
</template>

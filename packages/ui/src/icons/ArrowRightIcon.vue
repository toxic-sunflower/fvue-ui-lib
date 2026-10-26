<script setup lang="ts">
import { computed } from 'vue'
import type { IconSize } from '../types'

const props = withDefaults(defineProps<{ size?: IconSize; filled?: boolean }>(), {
  size: 24,
  filled: false,
})

const VARIANTS = {"16":{"outlined":[{"d":"M9.62 12.547a.5.5 0 0 1-.353-.147.503.503 0 0 1 0-.707L12.96 8 9.267 4.307a.503.503 0 0 1 0-.707.503.503 0 0 1 .706 0l4.047 4.047a.503.503 0 0 1 0 .706L9.973 12.4c-.1.1-.226.147-.353.147"},{"d":"M13.553 8.5H2.333a.504.504 0 0 1-.5-.5c0-.273.227-.5.5-.5h11.22c.274 0 .5.227.5.5s-.226.5-.5.5"}]},"24":{"outlined":[{"d":"M14.43 18.82c-.19 0-.38-.07-.53-.22a.754.754 0 0 1 0-1.06L19.44 12 13.9 6.46a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l6.07 6.07c.29.29.29.77 0 1.06l-6.07 6.07c-.15.15-.34.22-.53.22"},{"d":"M20.33 12.75H3.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h16.83c.41 0 .75.34.75.75s-.34.75-.75.75"}]},"32":{"outlined":[{"d":"M19.24 25.094a1 1 0 0 1-.707-.294 1.006 1.006 0 0 1 0-1.413L25.92 16l-7.387-7.387a1.006 1.006 0 0 1 0-1.413 1.006 1.006 0 0 1 1.414 0l8.093 8.093a1.006 1.006 0 0 1 0 1.414L19.947 24.8a1 1 0 0 1-.707.293"},{"d":"M27.107 17H4.667c-.547 0-1-.453-1-1s.453-1 1-1h22.44c.546 0 1 .453 1 1s-.454 1-1 1"}]}} as Record<number, { outlined: { d: string; sw?: number; eo?: boolean }[]; filled?: { d: string; sw?: number; eo?: boolean }[] }>

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

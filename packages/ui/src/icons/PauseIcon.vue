<script setup lang="ts">
import { computed } from 'vue'
import type { IconSize } from '../types'

const props = withDefaults(defineProps<{ size?: IconSize; filled?: boolean }>(), {
  size: 24,
  filled: false,
})

const VARIANTS = {"16":{"outlined":[{"d":"M7.98 15.167C4.033 15.167.813 11.953.813 8S4.033.833 7.98.833 15.147 4.047 15.147 8a7.173 7.173 0 0 1-7.167 7.167m0-13.334A6.174 6.174 0 0 0 1.813 8c0 3.4 2.767 6.167 6.167 6.167S14.147 11.4 14.147 8 11.38 1.833 7.98 1.833"},{"d":"M6.673 10.633h-.866c-.614 0-.974-.353-.974-.946V6.313c0-.593.367-.946.974-.946h.86c.613 0 .973.353.973.946v3.374c.007.593-.36.946-.967.946m-.84-1h.814V6.367H5.84zm4.36 1h-.86c-.613 0-.973-.353-.973-.946V6.313c0-.593.367-.946.973-.946h.86c.614 0 .974.353.974.946v3.374c0 .593-.367.946-.974.946m-.84-1h.814V6.367H9.36z"}],"filled":[{"d":"M7.98 1.333A6.67 6.67 0 0 0 1.313 8a6.67 6.67 0 0 0 6.667 6.667A6.67 6.67 0 0 0 14.647 8c0-3.68-2.98-6.667-6.667-6.667m-.833 8.687c0 .32-.134.447-.474.447h-.866c-.34 0-.474-.127-.474-.447V5.98c0-.32.134-.447.474-.447h.86c.34 0 .473.127.473.447v4.04zm3.52 0c0 .32-.134.447-.474.447h-.86c-.34 0-.473-.127-.473-.447V5.98c0-.32.133-.447.473-.447h.86c.34 0 .474.127.474.447z"}]},"24":{"outlined":[{"d":"M11.97 22.75C6.05 22.75 1.22 17.93 1.22 12S6.05 1.25 11.97 1.25 22.72 6.07 22.72 12 17.9 22.75 11.97 22.75m0-20c-5.1 0-9.25 4.15-9.25 9.25s4.15 9.25 9.25 9.25 9.25-4.15 9.25-9.25-4.15-9.25-9.25-9.25"},{"d":"M10.01 15.95h-1.3c-.92 0-1.46-.53-1.46-1.42V9.47c0-.89.55-1.42 1.46-1.42H10c.92 0 1.46.53 1.46 1.42v5.06c.01.89-.54 1.42-1.45 1.42m-1.26-1.5h1.22v-4.9H8.76zm6.54 1.5H14c-.92 0-1.46-.53-1.46-1.42V9.47c0-.89.55-1.42 1.46-1.42h1.29c.92 0 1.46.53 1.46 1.42v5.06c0 .89-.55 1.42-1.46 1.42m-1.26-1.5h1.22v-4.9h-1.21z"}],"filled":[{"d":"M11.97 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.47-10-10-10m-1.25 13.03c0 .48-.2.67-.71.67h-1.3c-.51 0-.71-.19-.71-.67V8.97c0-.48.2-.67.71-.67H10c.51 0 .71.19.71.67v6.06zm5.28 0c0 .48-.2.67-.71.67H14c-.51 0-.71-.19-.71-.67V8.97c0-.48.2-.67.71-.67h1.29c.51 0 .71.19.71.67z"}]},"32":{"outlined":[{"d":"M15.96 30.333C8.067 30.333 1.627 23.907 1.627 16S8.067 1.667 15.96 1.667 30.293 8.093 30.293 16 23.867 30.333 15.96 30.333m0-26.666C9.16 3.667 3.627 9.2 3.627 16S9.16 28.333 15.96 28.333 28.293 22.8 28.293 16 22.76 3.667 15.96 3.667"},{"d":"M13.347 21.266h-1.734c-1.226 0-1.946-.706-1.946-1.893v-6.747c0-1.186.733-1.893 1.946-1.893h1.72c1.227 0 1.947.707 1.947 1.893v6.747c.013 1.187-.72 1.893-1.933 1.893m-1.68-2h1.626v-6.533H11.68zm8.72 2h-1.72c-1.227 0-1.947-.706-1.947-1.893v-6.747c0-1.186.733-1.893 1.947-1.893h1.72c1.226 0 1.946.707 1.946 1.893v6.747c0 1.187-.733 1.893-1.946 1.893m-1.68-2h1.626v-6.533H18.72z"}],"filled":[{"d":"M15.96 2.667C8.6 2.667 2.627 8.64 2.627 16S8.6 29.333 15.96 29.333 29.293 23.36 29.293 16 23.333 2.667 15.96 2.667M14.293 20.04c0 .64-.266.893-.946.893h-1.734c-.68 0-.946-.253-.946-.893v-8.08c0-.64.266-.893.946-.893h1.72c.68 0 .947.253.947.893v8.08zm7.04 0c0 .64-.266.893-.946.893h-1.72c-.68 0-.947-.253-.947-.893v-8.08c0-.64.267-.893.947-.893h1.72c.68 0 .946.253.946.893z"}]}} as Record<number, { outlined: { d: string; sw?: number; eo?: boolean }[]; filled?: { d: string; sw?: number; eo?: boolean }[] }>

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

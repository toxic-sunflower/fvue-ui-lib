<script setup lang="ts">
import { useId } from 'vue'

withDefaults(defineProps<{ size?: number }>(), { size: 40 })

const uid = useId().replace(/:/g, '')
const bgId = `vip-${uid}-bg`
const borderId = `vip-${uid}-border`
</script>

<template>
  <svg viewBox="0 0 40 40" :width="size" :height="size" fill="none" aria-hidden="true" class="fvue-icon">
    <rect x=".5" y=".5" width="39" height="39" rx="19.5" :fill="`url(#${bgId})`" />
    <rect x=".5" y=".5" width="39" height="39" rx="19.5" :stroke="`url(#${borderId})`" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.51 29.524c-.82 0-1.218-.644-1.05-1.32.217-.92 1.35-3.65.498-4.876-1.254-1.795-4.373-1.534-5.075-2.454-.506-.676-.055-1.333.645-1.718 1.571-.92 4.613-.66 7.572-2.469 1.638-.981 3.142-2.975 3.995-4.171 1.203-1.687 1.722-2.04 4.246-2.04h8.84c1.392 0 1.828 2.167-.444 2.405-.585.062-2.145.276-4.368.522-2.123.245-6.837.831-4.981 3.607 1.387 1.457 4.312 1.273 4.981 2.147.484.605.056 1.249-.47 1.558-1.588.92-4.979.819-7.937 2.614-2.006 1.227-3.637 3.957-4.306 4.877-.485.675-1.31 1.319-2.13 1.319h-.016Z"
      fill="#151515"
    />
    <defs>
      <linearGradient
        :id="bgId"
        x1="42.37"
        y1="56.63"
        x2="13.3"
        y2="3.28"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#A8A8A6" />
        <stop offset=".385" stop-color="#696969" />
        <stop offset=".665" stop-color="#F9F8F6" />
        <stop offset=".892" stop-color="#D4D4D4" />
        <stop offset="1" stop-color="#7F7F7F" />
      </linearGradient>
      <linearGradient
        :id="borderId"
        x1="6.62"
        y1="53.95"
        x2="39.76"
        y2="-.15"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#504F54" />
        <stop offset=".203" stop-color="#B1B1B1" />
        <stop offset=".388" stop-color="#13181C" />
        <stop offset=".588" stop-color="#C6C6C8" />
        <stop offset=".693" stop-color="#fff" />
        <stop offset=".813" stop-color="#0C0F14" />
        <stop offset="1" stop-color="#696A6E" />
      </linearGradient>
    </defs>
  </svg>
</template>

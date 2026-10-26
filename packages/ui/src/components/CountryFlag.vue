<script setup lang="ts">
import { computed, useId } from 'vue'
import { FLAG_SHAPES, type CountryFlagCode } from '../flagShapes'
import type { CountryFlagSize } from '../types'

const props = withDefaults(
  defineProps<{
    country: string
    size?: CountryFlagSize
    label?: string
  }>(),
  { size: 20 },
)

const uid = useId().replace(/:/g, '')
const maskId = computed(() => `country-flag-${uid}`)
const shapes = computed(() => FLAG_SHAPES[(props.country.toLowerCase() as CountryFlagCode)] ?? FLAG_SHAPES['xx'])
</script>

<template>
  <svg
    viewBox="0 0 512 512"
    :width="size"
    :height="size"
    class="fvue-flag"
    :role="label ? 'img' : undefined"
    :aria-hidden="label ? undefined : true"
  >
    <title v-if="label">{{ label }}</title>
    <mask :id="maskId">
      <circle cx="256" cy="256" r="256" fill="#fff" />
    </mask>
    <g :mask="`url(#${maskId})`">
      <template v-for="(shape, i) in shapes" :key="i">
        <path v-if="shape.tag === 'path'" :fill="shape.fill" :d="shape.d" />
        <circle v-else-if="shape.tag === 'circle'" :fill="shape.fill" :cx="shape.cx" :cy="shape.cy" :r="shape.r" />
        <rect v-else-if="shape.tag === 'rect'" :fill="shape.fill" :x="shape.x" :y="shape.y" :width="shape.width" :height="shape.height" :rx="shape.rx" :ry="shape.ry" />
        <ellipse v-else-if="shape.tag === 'ellipse'" :fill="shape.fill" :cx="shape.cx" :cy="shape.cy" :rx="shape.rx" :ry="shape.ry" />
      </template>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'reka-ui'
import type { TooltipSide } from '../types'

withDefaults(
  defineProps<{
    label?: string
    side?: TooltipSide
    align?: 'start' | 'center' | 'end'
    delayDuration?: number
    disabled?: boolean
  }>(),
  { side: 'top', align: 'center', delayDuration: 200, disabled: false },
)
</script>

<template>
  <TooltipProvider :delay-duration="delayDuration">
    <TooltipRoot :disabled="disabled">
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent class="fvue-tooltip" :side="side" :align="align" role="tooltip">
          <slot name="content">{{ label }}</slot>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

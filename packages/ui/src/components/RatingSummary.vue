<script setup lang="ts">
withDefaults(
  defineProps<{
    average?: number
    total?: number
    histogram?: number[]
  }>(),
  { average: 0, total: 0, histogram: () => [] },
)
</script>

<template>
  <div class="fvue-rating">
    <div class="fvue-rating__head">
      <span class="fvue-rating__average">{{ average }}</span>
      <span class="fvue-rating__total">({{ total }})</span>
    </div>
    <div class="fvue-rating__histogram">
      <div v-for="(h, i) in histogram" :key="i" class="fvue-rating__row">
        <span class="fvue-rating__stars">{{ histogram.length - i }}★</span>
        <div class="fvue-rating__track">
          <div class="fvue-rating__bar" :style="{ width: `${Math.min(100, Math.max(0, h))}%` }" />
        </div>
      </div>
    </div>
  </div>
</template>

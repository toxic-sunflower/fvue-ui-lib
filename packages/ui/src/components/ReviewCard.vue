<script setup lang="ts">
withDefaults(
  defineProps<{
    rating?: number
    max?: number
    author?: string
    title?: string
  }>(),
  { rating: 0, max: 5 },
)
</script>

<template>
  <article class="fvue-review">
    <div class="fvue-review__stars" :aria-label="`Rated ${rating} out of ${max}`" role="img">
      <span v-for="i in max" :key="i" :class="['fvue-review__star', i <= rating && 'fvue-review__star--on']" aria-hidden="true">★</span>
    </div>
    <p v-if="author" class="fvue-field__helper">{{ author }}</p>
    <p v-if="title" class="fvue-review__title">{{ title }}</p>
    <div class="fvue-review__body"><slot /></div>
  </article>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 14 })
</script>

<template>
  <svg viewBox="0 0 14 14" :width="size" :height="size" fill="none" aria-hidden="true" class="fvue-icon">
    <path
          fill="currentColor"
          d="M11.0306 0H13.1817L8.49148 5.57953L14 13.1596H9.6908L6.30348 8.55739L2.42757 13.1596H0.275308L5.28626 7.19433L0 0.000606537H4.4275L7.4962 4.20241L11.0306 0ZM10.2752 11.817H11.4665L3.78737 1.26538H2.50918L10.2752 11.817Z"
        />
  </svg>
</template>

# AiButton

<script setup>
import { ref } from 'vue'
import { AiButton } from 'fvue-ui-lib'
const busy = ref(false)
</script>

<div class="demo-row">
  <AiButton label="Analyse" activeLabel="Analysing" :active="busy" @click="busy = !busy" />
  <AiButton label="Idle shimmer off" :idleShimmer="false" />
</div>

# Slider

<script setup>
import { ref } from 'vue'
import { Slider } from 'fvue-ui-lib'
const v = ref([30])
</script>

<div class="demo-row">
  <Slider v-model="v" label="Volume" />
</div>

<p>Value: {{ v }}</p>

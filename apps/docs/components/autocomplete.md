# Autocomplete

<script setup>
import { ref } from 'vue'
import { Autocomplete } from 'fvue-ui-lib'
const v = ref('')
const options = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
]
</script>

<div class="demo-row">
  <Autocomplete v-model="v" label="Country" placeholder="Type to search" :options="options" />
</div>

<p>Value: {{ v }}</p>

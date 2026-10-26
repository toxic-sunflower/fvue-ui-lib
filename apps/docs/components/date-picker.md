# DatePicker

<script setup>
import { ref } from 'vue'
import { DatePicker } from 'fvue-ui-lib'
const single = ref('')
const range = ref({ from: '', to: '' })
</script>

<div class="demo-row">
  <DatePicker v-model="single" label="Date" />
  <DatePicker v-model="range" mode="range" label="Range" />
</div>

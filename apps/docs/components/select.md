# Select

<script setup>
import { ref } from 'vue'
import { Select, SelectContent, SelectItem } from 'fvue-ui-lib'
const v = ref('')
const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
]
</script>

<div class="demo-row">
  <Select v-model="v" label="Country" placeholder="Pick one" helperText="Helper text">
    <SelectContent>
      <SelectItem v-for="c in countries" :key="c.value" :value="c.value">{{ c.label }}</SelectItem>
    </SelectContent>
  </Select>
</div>

<div class="demo-row">
  <Select label="Filled" variant="filled" placeholder="Pick one">
    <SelectContent>
      <SelectItem v-for="c in countries" :key="c.value" :value="c.value">{{ c.label }}</SelectItem>
    </SelectContent>
  </Select>
  <Select label="Error" error errorMessage="Required">
    <SelectContent>
      <SelectItem value="us">United States</SelectItem>
    </SelectContent>
  </Select>
</div>

<div class="demo-dark dark">
  <Select v-model="v" label="Country (dark)" placeholder="Pick one">
    <SelectContent>
      <SelectItem v-for="c in countries" :key="c.value" :value="c.value">{{ c.label }}</SelectItem>
    </SelectContent>
  </Select>
</div>

<p>Value: {{ v }}</p>

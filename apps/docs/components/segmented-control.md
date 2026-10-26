# SegmentedControl

<script setup>
import { ref } from 'vue'
import { SegmentedControl } from 'fvue-ui-lib'
const v = ref('day')
const options = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
]
</script>

<SegmentedControl v-model="v" :options="options" />

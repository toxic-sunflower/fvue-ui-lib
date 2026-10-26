# RadioGroup

<script setup>
import { ref } from 'vue'
import { Radio, RadioGroup } from 'fvue-ui-lib'
const v = ref('a')
</script>

<RadioGroup v-model="v">
  <Radio value="a" label="Option A" />
  <Radio value="b" label="Option B" description="With helper text" />
</RadioGroup>

<p>Value: {{ v }}</p>

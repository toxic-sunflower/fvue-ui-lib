# SwitchToggle

<script setup>
import { ref } from 'vue'
import { SwitchToggle } from 'fvue-ui-lib'
const v = ref('off')
</script>

<div class="demo-row">
  <SwitchToggle v-model="v" :options="[{ value: 'off', label: 'Off' }, { value: 'on', label: 'On' }]" />
</div>

<p>Value: {{ v }}</p>

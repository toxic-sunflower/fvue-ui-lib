# SwitchButton

<script setup>
import { ref } from 'vue'
import { SwitchButton } from 'fvue-ui-lib'
const v = ref(false)
</script>

<div class="demo-row">
  <SwitchButton v-model="v" label="Dark mode" />
  <SwitchButton label="Disabled" disabled />
</div>

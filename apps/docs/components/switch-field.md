# SwitchField

<script setup>
import { ref } from 'vue'
import { SwitchField } from 'fvue-ui-lib'
const v = ref(true)
</script>

<div class="demo-row">
  <SwitchField v-model="v" label="Notifications" helperText="Get updates about your fans" />
</div>

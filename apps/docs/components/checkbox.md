# Checkbox / Switch

<script setup>
import { ref } from 'vue'
import { Checkbox, Switch } from 'fvue-ui-lib'
const a = ref(false)
const b = ref(true)
</script>

<div class="demo-row">
  <Checkbox v-model="a" label="Accept terms" helperText="Required to continue" />
  <Checkbox :defaultValue="true" label="Checked by default" />
  <Checkbox disabled label="Disabled" />
</div>

<div class="demo-row">
  <Switch v-model="b" label="Notifications" />
  <Switch :defaultValue="false" label="Off by default" />
  <Switch disabled label="Disabled" />
</div>

<div class="demo-dark dark">
  <Checkbox v-model="a" label="Accept (dark)" />
  <Switch v-model="b" label="Notify (dark)" />
</div>

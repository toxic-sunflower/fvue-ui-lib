# TextField

<script setup>
import { ref } from 'vue'
import { TextField } from 'fvue-ui-lib'
const v = ref('')
</script>

<div class="demo-row">
  <TextField v-model="v" label="Name" placeholder="Ada Lovelace" helperText="Visible to fans" />
</div>

<div class="demo-row">
  <TextField label="Email" size="32" placeholder="32px" />
  <TextField label="Email" size="40" placeholder="40px" />
  <TextField label="Email" size="48" placeholder="48px" />
</div>

<div class="demo-row">
  <TextField label="With error" error errorMessage="Required field" />
  <TextField label="Disabled" disabled placeholder="Can't type" />
</div>

<div class="demo-dark dark">
  <TextField v-model="v" label="Name (dark)" placeholder="Ada Lovelace" helperText="Visible to fans" />
</div>

<p>Typed: {{ v }}</p>

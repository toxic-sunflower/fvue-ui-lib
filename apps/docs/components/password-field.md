# PasswordField

<script setup>
import { ref } from 'vue'
import { PasswordField } from 'fvue-ui-lib'
const v = ref('')
</script>

<div class="demo-row">
  <PasswordField v-model="v" label="Password" helperText="Min 8 characters" />
</div>

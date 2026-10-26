# PhoneField

<script setup>
import { ref } from 'vue'
import { PhoneField } from 'fvue-ui-lib'
const v = ref('')
</script>

<div class="demo-row">
  <PhoneField v-model="v" label="Phone" dialCode="+44" placeholder="7700 900000" helperText="For verification codes" />
</div>

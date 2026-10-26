# TextArea

<script setup>
import { ref } from 'vue'
import { TextArea } from 'fvue-ui-lib'
const v = ref('')
</script>

<div class="demo-row">
  <TextArea v-model="v" label="Bio" placeholder="Tell fans about you" helperText="Max 500 chars" />
</div>

<div class="demo-row">
  <TextArea label="Error" error errorMessage="Required" />
</div>

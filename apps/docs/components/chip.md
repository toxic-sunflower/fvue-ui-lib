# Chip

<script setup>
import { ref } from 'vue'
import { Chip } from 'fvue-ui-lib'
const on = ref(false)
</script>

<div class="demo-row">
  <Chip>Default</Chip>
  <Chip variant="outlined">Outlined</Chip>
  <Chip variant="dotted">Dotted</Chip>
  <Chip :selected="on" @toggle="on = $event">Toggle: {{ on }}</Chip>
</div>

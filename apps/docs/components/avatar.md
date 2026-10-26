# Avatar

<script setup>
import { Avatar } from 'fvue-ui-lib'
</script>

<div class="demo-row">
  <Avatar name="Ada Lovelace" :size="40" />
  <Avatar name="Ada Lovelace" :size="40" online />
  <Avatar name="Ada Lovelace" :size="40" blur />
  <Avatar fallback="Q" :size="32" />
</div>

<div class="demo-dark dark">
  <Avatar name="Ada Lovelace" :size="40" online />
</div>

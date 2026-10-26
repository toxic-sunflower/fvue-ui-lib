# Tooltip

<script setup>
import { Button, Tooltip } from 'fvue-ui-lib'
</script>

<div class="demo-row">
  <Tooltip label="Shown on hover or focus">
    <Button variant="secondary">Hover me</Button>
  </Tooltip>
  <Tooltip label="On the right" side="right">
    <Button variant="secondary">Right</Button>
  </Tooltip>
</div>

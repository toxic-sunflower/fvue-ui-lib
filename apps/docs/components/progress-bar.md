# ProgressBar

<script setup>
import { ProgressBar } from 'fvue-ui-lib'
</script>

<div style="max-width: 320px; display: flex; flex-direction: column; gap: 12px;">
  <ProgressBar :modelValue="65" title="Uploading" helperText="2 of 3 files" />
  <ProgressBar :modelValue="null" title="Waiting" />
</div>

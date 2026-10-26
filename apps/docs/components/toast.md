# Toast

<script setup>
import { Button, Toast, useToast } from 'fvue-ui-lib'
const { push } = useToast()
</script>

<Toast>
  <div class="demo-row">
    <Button variant="secondary" @click="push({ title: 'Saved', description: 'All good' })">Show toast</Button>
  </div>
</Toast>

Toasts render in a viewport fixed at the bottom of the screen and auto-dismiss after 4s.

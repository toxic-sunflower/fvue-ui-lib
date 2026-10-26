# Drawer

<script setup>
import { Button, Drawer } from 'fvue-ui-lib'
</script>

<div class="demo-row">
  <Drawer>
    <template #trigger><Button>Open drawer</Button></template>
    <template #title><h3 style="margin:0">Panel title</h3></template>
    <template #description><p>Panel description.</p></template>
    Drawer body content.
    <template #footer><Button>Done</Button></template>
  </Drawer>
</div>

Drawer slides from the right (`side="left"` mirrors it). Built on the dialog primitive, so focus trap and ESC come free.

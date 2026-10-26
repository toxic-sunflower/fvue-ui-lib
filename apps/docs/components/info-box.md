# InfoBox

<script setup>
import { Button, InfoBox } from 'fvue-ui-lib'
</script>

<InfoBox>
  <template #trigger><Button variant="secondary" size="32">Why?</Button></template>
  Explanatory text shown in a popover.
</InfoBox>

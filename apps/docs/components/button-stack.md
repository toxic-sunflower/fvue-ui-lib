# ButtonStack

<script setup>
import { Button, ButtonStack } from 'fvue-ui-lib'
</script>

<ButtonStack direction="horizontal">
  <Button variant="secondary">Cancel</Button>
  <Button>Save</Button>
</ButtonStack>

<ButtonStack direction="vertical">
  <Button>Continue</Button>
  <Button variant="tertiary">Back</Button>
</ButtonStack>

# Banner

<script setup>
import { Banner, Button } from 'fvue-ui-lib'
</script>

<Banner>
  New feature available
  <template #actions>
    <Button size="32">Try it</Button>
  </template>
</Banner>

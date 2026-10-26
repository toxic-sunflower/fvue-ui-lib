# CreatorCard

<script setup>
import { Button, CreatorCard } from 'fvue-ui-lib'
</script>

<div style="max-width: 320px;">
  <CreatorCard name="Ada Lovelace" tagline="Science & tech">
    <template #actions>
      <Button>Subscribe</Button>
      <Button variant="secondary">Message</Button>
    </template>
  </CreatorCard>
</div>

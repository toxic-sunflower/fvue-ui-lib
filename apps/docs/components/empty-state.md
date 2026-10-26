# EmptyState

<script setup>
import { Button, EmptyState } from 'fvue-ui-lib'
</script>

<EmptyState title="No messages yet" description="Start a conversation to see it here.">
  <template #actions>
    <Button>New message</Button>
  </template>
</EmptyState>

# ChatEmbed

<script setup>
import { ChatEmbed, LiveStatus } from 'fvue-ui-lib'
</script>

<div style="max-width: 320px;">
  <ChatEmbed title="Friday live stream" description="Starts at 8pm" href="#">
    <template #badge><LiveStatus /></template>
  </ChatEmbed>
</div>

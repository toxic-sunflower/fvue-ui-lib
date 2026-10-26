# UserItem

<script setup>
import { Button, UserItem } from 'fvue-ui-lib'
</script>

<div style="max-width: 320px; display: flex; flex-direction: column; gap: 8px;">
  <UserItem name="Ada Lovelace" handle="ada" verified online>
    <template #trailing><Button size="32">Follow</Button></template>
  </UserItem>
  <UserItem name="Alan Turing" handle="alan" muted />
</div>

# ChatInput

<script setup>
import { ref } from 'vue'
import { ChatInput } from 'fvue-ui-lib'
const v = ref('')
</script>

<div style="max-width: 480px;">
  <ChatInput v-model="v" placeholder="Message…" @submit="(t) => (v = '')" />
</div>

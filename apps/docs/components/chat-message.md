# ChatMessage

<script setup>
import { ref } from 'vue'
import { ChatMessage } from 'fvue-ui-lib'
const playing = ref(false)
</script>

<div style="display:flex;flex-direction:column;gap:12px;max-width:480px">
  <ChatMessage user="receiver" message="Hello there" time="16:00" avatarFallback="AL" online />
  <ChatMessage user="sender" message="Hi! How are you?" time="16:01" status="read" />
  <ChatMessage variant="typing" />
  <ChatMessage variant="audio" v-model:playing="playing" audioDuration="0:05" :waveform="[0.2,0.5,0.8,0.4,0.9,0.3]" time="16:02" />
  <ChatMessage variant="deleted" />
</div>

<div class="demo-dark dark" style="max-width:480px;margin-top:12px">
  <ChatMessage user="receiver" message="Dark bubble" time="16:00" avatarFallback="AL" />
  <ChatMessage user="sender" message="Dark reply" time="16:01" status="delivered" />
</div>

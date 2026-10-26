# AudioPlayer

<script setup>
import { AudioPlayer } from 'fvue-ui-lib'
</script>

<div style="max-width: 320px;">
  <AudioPlayer :duration="65" :waveform="[0.2, 0.5, 0.8, 0.4, 0.9, 0.3, 0.6]" />
</div>

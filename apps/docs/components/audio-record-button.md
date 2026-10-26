# AudioRecordButton

<script setup>
import { ref } from 'vue'
import { AudioRecordButton } from 'fvue-ui-lib'
const v = ref(false)
</script>

<AudioRecordButton :recording="v" @update:recording="v = $event" />

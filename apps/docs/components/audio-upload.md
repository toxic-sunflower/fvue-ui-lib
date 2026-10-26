# AudioUpload

<script setup>
import { AudioUpload } from 'fvue-ui-lib'
</script>

<AudioUpload @file="(f) => console.log(f.name)" />

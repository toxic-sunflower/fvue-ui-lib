# PageSelector

<script setup>
import { ref } from 'vue'
import { PageSelector } from 'fvue-ui-lib'
const v = ref(2)
</script>

<PageSelector v-model="v" :total="7" />

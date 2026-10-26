# Pagination

<script setup>
import { ref } from 'vue'
import { Pagination } from 'fvue-ui-lib'
const v = ref(2)
</script>

<Pagination v-model="v" :total="10" />

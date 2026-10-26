# SearchField

<script setup>
import { ref } from 'vue'
import { SearchField } from 'fvue-ui-lib'
const q = ref('')
</script>

<div class="demo-row">
  <SearchField v-model="q" placeholder="Search chats" />
</div>

<p>Query: {{ q }}</p>

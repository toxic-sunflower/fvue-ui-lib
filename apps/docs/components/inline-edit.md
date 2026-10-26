# InlineEdit

<script setup>
import { ref } from 'vue'
import { InlineEdit } from 'fvue-ui-lib'
const v = ref('Nickname')
</script>

<div class="demo-row">
  <InlineEdit v-model="v" />
</div>

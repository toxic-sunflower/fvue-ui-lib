# AnimatedNumber

<script setup>
import { ref } from 'vue'
import { AnimatedNumber, Button } from 'fvue-ui-lib'
const v = ref(1200)
</script>

<div class="demo-row">
  <AnimatedNumber :value="v" />
  <Button variant="secondary" size="32" @click="v += 137">+137</Button>
</div>

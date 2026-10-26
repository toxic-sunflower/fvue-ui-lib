# Stepper

<script setup>
import { Stepper } from 'fvue-ui-lib'
const steps = [
  { value: 'a', label: 'Account' },
  { value: 'b', label: 'Profile' },
  { value: 'c', label: 'Done' },
]
</script>

<Stepper :steps="steps" active="b" :completed="['a']" />

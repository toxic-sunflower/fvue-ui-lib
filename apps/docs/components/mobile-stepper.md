# MobileStepper

<script setup>
import { MobileStepper } from 'fvue-ui-lib'
const steps = [
  { value: 'a', label: 'One' },
  { value: 'b', label: 'Two' },
  { value: 'c', label: 'Three' },
]
</script>

<MobileStepper :steps="steps" active="b">Step 2 of 3</MobileStepper>

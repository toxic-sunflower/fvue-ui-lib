# CountryFlag

<script setup>
import { CountryFlag } from 'fvue-ui-lib/flags'
const codes = ['us', 'gb', 'de', 'fr', 'br', 'jp', 'xx']
</script>

<div class="demo-row">
  <CountryFlag v-for="c in codes" :key="c" :country="c" :label="c.toUpperCase()" />
</div>

<div class="demo-row">
  <CountryFlag country="us" :size="16" />
  <CountryFlag country="us" :size="20" />
  <CountryFlag country="us" :size="24" />
  <CountryFlag country="us" :size="32" />
</div>

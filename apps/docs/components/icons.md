# Icons

<script setup>
import * as icons from 'fvue-ui-lib'
const names = Object.keys(icons).filter((n) => n.endsWith('Icon') && !['IconButton', 'ButtonIconGroup'].includes(n)).sort()
</script>

<p>{{ names.length }} static icons (sizes 16 / 24 / 32, filled variant where available).</p>

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px;">
  <div v-for="n in names" :key="n" style="display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px; border: 1px solid var(--color-border-primary); border-radius: 8px;">
    <component :is="icons[n]" :size="24" />
    <code style="font-size: 10px;">{{ n }}</code>
  </div>
</div>

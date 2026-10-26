# AnimatedIcons

<script setup>
import * as animated from 'fvue-ui-lib/animated-icons'
const names = Object.keys(animated).sort()
</script>

<p>{{ names.length }} animated icons — hover to play (static fallback where motion artwork differs).</p>

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px;">
  <div v-for="n in names" :key="n" style="display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px; border: 1px solid var(--color-border-primary); border-radius: 8px;">
    <component :is="animated[n]" :size="24" />
    <code style="font-size: 10px;">{{ n }}</code>
  </div>
</div>

# Chart

<script setup>
import { ChartCard, ChartContainer, ChartLegendContent, ChartSkeleton } from 'fvue-ui-lib'
const config = {
  revenue: { label: 'Revenue', color: 'var(--color-special-chart-teal)' },
  subs: { label: 'Subscribers', color: '#8884d8' },
}
</script>

<div style="max-width: 480px; display: flex; flex-direction: column; gap: 12px;">
  <ChartCard title="Revenue" description="Last 30 days">
    <ChartContainer :config="config">
      <div style="height: 120px; display: flex; align-items: center; justify-content: center; color: var(--color-content-secondary);">
        Render your chart here (Recharts-compatible chrome)
      </div>
      <ChartLegendContent />
    </ChartContainer>
  </ChartCard>
  <ChartSkeleton />
</div>

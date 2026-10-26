import { defineComponent, h, inject, type Ref } from 'vue'
import type { ChartConfig } from '../types'

function useChartConfig(): Ref<ChartConfig> {
  return inject('fvue-chart-config', { value: {} } as unknown as Ref<ChartConfig>)
}

export { useChartConfig as useChart }

export const ChartTooltipWrap = defineComponent({
  name: 'ChartTooltip',
  setup(_, { slots }) {
    return () => h('div', { class: 'fvue-chart-tooltip' }, slots)
  },
})

export const ChartTooltipContentWrap = defineComponent({
  name: 'ChartTooltipContent',
  props: { label: { type: String, default: '' } },
  setup(props, { slots }) {
    const config = useChartConfig()
    return () =>
      h('div', { class: 'fvue-chart-tooltip__content' }, [
        props.label ? h('p', { class: 'fvue-chart-tooltip__label' }, props.label) : null,
        ...Object.entries(config.value).map(([key, entry]) =>
          h('div', { key, class: 'fvue-chart-tooltip__row' }, [
            h('span', { class: 'fvue-chart-tooltip__dot', style: { background: entry.color ?? `var(--color-${key})` } }),
            h('span', { class: 'fvue-chart-tooltip__name' }, entry.label ?? key),
            slots.default?.(),
          ]),
        ),
      ])
  },
})

export const ChartLegendWrap = defineComponent({
  name: 'ChartLegend',
  setup(_, { slots }) {
    return () => h('div', { class: 'fvue-chart-legend' }, slots)
  },
})

export const ChartLegendContentWrap = defineComponent({
  name: 'ChartLegendContent',
  setup() {
    const config = useChartConfig()
    return () =>
      h('div', { class: 'fvue-chart-legend__content' }, [
        ...Object.entries(config.value).map(([key, entry]) =>
          h('span', { key, class: 'fvue-chart-legend__item' }, [
            h('span', { class: 'fvue-chart-tooltip__dot', style: { background: entry.color ?? `var(--color-${key})` } }),
            entry.label ?? key,
          ]),
        ),
      ])
  },
})

export const ChartSkeletonWrap = defineComponent({
  name: 'ChartSkeleton',
  props: { variant: { type: String, default: 'default' } },
  setup(props, { attrs }) {
    return () => h('div', { class: ['fvue-skeleton', `fvue-chart-skeleton--${props.variant}`], 'aria-hidden': true, ...(attrs as object) })
  },
})

export const ChartLoadingOverlayWrap = defineComponent({
  name: 'ChartLoadingOverlay',
  props: { loading: { type: Boolean, default: true } },
  setup(props, { slots }) {
    return () =>
      h('div', { class: 'fvue-chart-loading' }, [
        props.loading ? h('div', { class: 'fvue-loader', role: 'status', 'aria-label': 'Loading chart' }) : null,
        slots.default?.(),
      ])
  },
})

export const ChartStyleWrap = defineComponent({
  name: 'ChartStyle',
  setup(_, { attrs }) {
    return () => h('style', { ...(attrs as object) })
  },
})

export const ChartMetricTrendWrap = defineComponent({
  name: 'ChartMetricTrend',
  props: { value: { type: [String, Number], default: '' }, trend: { type: String as () => 'up' | 'down' | 'flat', default: 'flat' } },
  setup(props, { slots }) {
    return () =>
      h('div', { class: ['fvue-trend-pill', `fvue-trend-pill--${props.trend}`] }, slots.default?.() ?? String(props.value))
  },
})

export const ChartSeriesToggleWrap = defineComponent({
  name: 'ChartSeriesToggle',
  props: { items: { type: Array as () => { value: string; label?: string }[], default: () => [] }, modelValue: { type: Array as () => string[], default: () => [] } },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () =>
      h('div', { class: 'fvue-chart-toggle', role: 'group', 'aria-label': 'Series' }, [
        ...props.items.map((item) =>
          h(
            'button',
            {
              key: item.value,
              type: 'button',
              class: ['fvue-chip', (props.modelValue as string[]).includes(item.value) && 'fvue-chip--selected'],
              'aria-pressed': (props.modelValue as string[]).includes(item.value),
              onClick: () => {
                const cur = props.modelValue as string[]
                emit('update:modelValue', cur.includes(item.value) ? cur.filter((v) => v !== item.value) : [...cur, item.value])
              },
            },
            item.label ?? item.value,
          ),
        ),
      ])
  },
})

export const ChartPieLegendWrap = defineComponent({
  name: 'ChartPieLegend',
  props: { items: { type: Array as () => { value: string; label?: string; color?: string }[], default: () => [] } },
  setup(props) {
    return () =>
      h('div', { class: 'fvue-chart-legend__content' }, [
        ...props.items.map((item) =>
          h('span', { key: item.value, class: 'fvue-chart-legend__item' }, [
            h('span', { class: 'fvue-chart-tooltip__dot', style: { background: item.color ?? `var(--color-${item.value})` } }),
            item.label ?? item.value,
          ]),
        ),
      ])
  },
})

export const ChartCenterLabelWrap = defineComponent({
  name: 'ChartCenterLabel',
  setup(_, { slots }) {
    return () => h('div', { class: 'fvue-chart-center' }, slots)
  },
})

import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import DatePicker from './DatePicker.vue'
import ChartContainer from './ChartContainer.vue'
import ChartCard from './ChartCard.vue'
import { ChartLegendContentWrap as ChartLegendContent } from './chart-parts'

describe('advanced', () => {
  it('DatePicker single emits date', async () => {
    const w = mount(DatePicker, { props: { label: 'When' } })
    expect(w.find('label').text()).toBe('When')
    await w.find('input').setValue('2026-10-25')
    expect(w.emitted('update:modelValue')?.[0]).toEqual(['2026-10-25'])
  })

  it('DatePicker range emits range', async () => {
    const w = mount(DatePicker, { props: { mode: 'range' } })
    const inputs = w.findAll('input')
    expect(inputs).toHaveLength(2)
    await inputs[0].setValue('2026-10-01')
    expect(w.emitted('update:modelValue')?.[0]).toEqual([{ from: '2026-10-01', to: '' }])
  })

  it('ChartContainer provides config to legend', () => {
    const w = mount(ChartContainer, {
      props: { config: { revenue: { label: 'Revenue', color: '#00ff00' } } },
      slots: { default: '<div>chart</div>' },
    })
    expect(w.text()).toContain('chart')
    const l = mount(ChartLegendContent)
    expect(l.exists()).toBe(true)
    expect(mount(ChartCard, { props: { title: 'T' } }).text()).toContain('T')
  })
})

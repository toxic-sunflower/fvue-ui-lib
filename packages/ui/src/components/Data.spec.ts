import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import Accordion from './Accordion.vue'
import { AccordionContentWrap as AccordionContent, AccordionItemWrap as AccordionItem, AccordionTriggerWrap as AccordionTrigger } from './accordion-parts'
import { TableCardWrap as TableCard, TableCellWrap as TableCell, TableHeaderWrap as TableHeader, TableHeadWrap as TableHead, TableRowWrap as TableRow, TableToolbarWrap as TableToolbar } from './table-parts'
import TablePagination from './TablePagination.vue'
import Chip from './Chip.vue'
import Pill from './Pill.vue'
import Count from './Count.vue'
import Demographics from './Demographics.vue'
import RatingSummary from './RatingSummary.vue'
import AnimatedNumber from './AnimatedNumber.vue'
import CyclingText from './CyclingText.vue'
import TrendPill from './TrendPill.vue'

describe('data-display', () => {
  it('Accordion expands trigger', async () => {
    const w = mount(
      defineComponent({
        render() {
          return h(Accordion, { type: 'single', collapsible: true }, {
            default: () => [
              h(AccordionItem, { value: 'a' }, {
                default: () => [h(AccordionTrigger, null, () => 'Head'), h(AccordionContent, null, () => 'Body')],
              }),
            ],
          })
        },
      }),
    )
    await w.find('button').trigger('click')
    await nextTick()
    expect(w.text()).toContain('Body')
  })

  it('Table renders card with rows', () => {
    const w = mount(
      defineComponent({
        render() {
          return h(TableCard, null, {
            default: () => [
              h(TableToolbar, null, () => 'Toolbar'),
              h(TableHeader, null, { default: () => [h(TableHead, null, () => 'Name')] }),
              h(TableRow, null, { default: () => [h(TableCell, null, () => 'Ada')] }),
            ],
          })
        },
      }),
    )
    expect(w.text()).toContain('Toolbar')
    expect(w.text()).toContain('Ada')
    const p = mount(TablePagination, { props: { defaultValue: 1, total: 3 } })
    expect(p.text()).toContain('Page 1 of 3')
  })

  it('Chip toggles, Pill/Count render', async () => {
    const c = mount(Chip, { props: { selected: false }, slots: { default: 'Tag' } })
    await c.trigger('click')
    expect(c.emitted('toggle')?.[0]).toEqual([true])
    expect(mount(Pill, { slots: { default: 'New' } }).text()).toBe('New')
    expect(mount(Count, { props: { count: 150 } }).text()).toContain('99+')
    expect(mount(Count, { props: { count: 5 } }).text()).toContain('5')
  })

  it('Demographics/TrendPill/RatingSummary render', () => {
    const d = mount(Demographics, { props: { label: 'US', share: '40%', value: 40 } })
    expect(d.find('[role="progressbar"]').exists()).toBe(true)
    expect(mount(TrendPill, { props: { direction: 'up' }, slots: { default: '+5%' } }).classes()).toContain('fvue-trend-pill--up')
    const r = mount(RatingSummary, { props: { average: 4.5, total: 120, histogram: [70, 20, 10] } })
    expect(r.text()).toContain('4.5')
  })

  it('AnimatedNumber and CyclingText render', async () => {
    vi.useFakeTimers()
    const a = mount(AnimatedNumber, { props: { value: 42 } })
    expect(a.text()).toBe('42')
    const c = mount(CyclingText, { props: { items: ['one', 'two'] } })
    expect(c.text()).toContain('one')
    vi.useRealTimers()
  })
})

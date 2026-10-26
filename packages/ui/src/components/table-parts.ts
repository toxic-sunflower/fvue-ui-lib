import { defineComponent, h } from 'vue'

function el(name: string, tag: string, cls: string, extra: Record<string, unknown> = {}) {
  return defineComponent({
    name,
    setup(_, { slots, attrs }) {
      return () => h(tag, { class: cls, ...extra, ...(attrs as object) }, slots)
    },
  })
}

export const TableWrap = el('Table', 'div', 'fvue-table')
export const TableCardWrap = el('TableCard', 'div', 'fvue-table-card')
export const TableScrollAreaWrap = el('TableScrollArea', 'div', 'fvue-table-scroll')
export const TableToolbarWrap = el('TableToolbar', 'div', 'fvue-table-toolbar')
export const TableHeaderWrap = el('TableHeader', 'div', 'fvue-table-thead')
export const TableHeadWrap = el('TableHead', 'div', 'fvue-table-th')
export const TableBodyWrap = el('TableBody', 'div', 'fvue-table-tbody')
export const TableRowWrap = el('TableRow', 'div', 'fvue-table-tr')
export const TableCellWrap = el('TableCell', 'div', 'fvue-table-td')
export const TableFooterWrap = el('TableFooter', 'div', 'fvue-table-tfoot')
export const TableCellGroupWrap = el('TableCellGroup', 'div', 'fvue-table-cell-group')
export const TableLineClampWrap = defineComponent({
  name: 'TableLineClamp',
  props: { lines: { type: Number, default: 2 } },
  setup(props, { slots, attrs }) {
    return () => h('span', { class: 'fvue-table-clamp', style: { '-webkit-line-clamp': String(props.lines) }, ...(attrs as object) }, slots)
  },
})
export const TableMediaThumbnailWrap = defineComponent({
  name: 'TableMediaThumbnail',
  props: { src: { type: String, default: '' }, alt: { type: String, default: '' } },
  setup(props, { attrs }) {
    return () => h('img', { class: 'fvue-table-thumb', src: props.src, alt: props.alt, ...(attrs as object) })
  },
})
export const TableProgressTrackWrap = defineComponent({
  name: 'TableProgressTrack',
  props: { value: { type: Number, default: 0 }, max: { type: Number, default: 100 } },
  setup(props, { attrs }) {
    return () =>
      h('div', { class: 'fvue-table-progress', role: 'progressbar', 'aria-valuenow': props.value, 'aria-valuemin': 0, 'aria-valuemax': props.max, ...(attrs as object) }, [
        h('div', { class: 'fvue-table-progress__bar', style: { width: `${Math.min(100, Math.max(0, (props.value / props.max) * 100))}%` } }),
      ])
  },
})
export const TableStatusDotWrap = defineComponent({
  name: 'TableStatusDot',
  props: { status: { type: String, default: 'default' } },
  setup(props, { attrs }) {
    return () => h('span', { class: ['fvue-table-dot', `fvue-table-dot--${props.status}`], ...(attrs as object) })
  },
})
export const TableSortLabelWrap = defineComponent({
  name: 'TableSortLabel',
  props: { direction: { type: String as () => 'asc' | 'desc' | undefined, default: undefined } },
  setup(props, { slots, attrs }) {
    return () =>
      h('button', { type: 'button', class: 'fvue-table-sort', 'aria-sort': props.direction === 'asc' ? 'ascending' : props.direction === 'desc' ? 'descending' : 'none', ...(attrs as object) }, slots)
  },
})
export const TableMobileRowWrap = el('TableMobileRow', 'div', 'fvue-table-mobile-row')

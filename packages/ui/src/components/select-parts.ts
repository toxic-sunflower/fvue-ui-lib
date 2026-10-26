import { defineComponent, h } from 'vue'
import { SelectGroup, SelectLabel, SelectSeparator } from 'reka-ui'

export const SelectGroupWrap = defineComponent({
  name: 'SelectGroup',
  setup(_, { slots, attrs }) {
    return () => h(SelectGroup, attrs, slots)
  },
})

export const SelectLabelWrap = defineComponent({
  name: 'SelectLabel',
  setup(_, { slots, attrs }) {
    return () => h(SelectLabel, { class: 'fvue-select-label', ...attrs }, slots)
  },
})

export const SelectSeparatorWrap = defineComponent({
  name: 'SelectSeparator',
  setup(_, { attrs }) {
    return () => h(SelectSeparator, { class: 'fvue-select-separator', ...attrs })
  },
})

import { defineComponent, h } from 'vue'
import { AccordionContent, AccordionHeader, AccordionItem, AccordionTrigger } from 'reka-ui'

export const AccordionItemWrap = defineComponent({
  name: 'AccordionItem',
  props: { value: { type: String, required: true }, disabled: { type: Boolean, default: false } },
  setup(props, { slots, attrs }) {
    return () => h(AccordionItem, { value: props.value, disabled: props.disabled, class: 'fvue-accordion__item', ...(attrs as object) }, slots)
  },
})

export const AccordionTriggerWrap = defineComponent({
  name: 'AccordionTrigger',
  setup(_, { slots, attrs }) {
    return () =>
      h(AccordionHeader, { class: 'fvue-accordion__header' }, {
        default: () =>
          h(AccordionTrigger, { class: 'fvue-accordion__trigger', ...(attrs as object) }, {
            default: () => [
              slots.default?.(),
              h('svg', { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': true, class: 'fvue-accordion__chevron' }, [
                h('path', { d: 'm4 6 4 4 4-4', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
              ]),
            ],
          }),
      })
  },
})

export const AccordionContentWrap = defineComponent({
  name: 'AccordionContent',
  props: { noPadding: { type: Boolean, default: false } },
  setup(props, { slots, attrs }) {
    return () =>
      h(AccordionContent, { class: ['fvue-accordion__content', props.noPadding && 'fvue-accordion__content--no-padding'], ...(attrs as object) }, slots)
  },
})

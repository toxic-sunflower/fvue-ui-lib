import { defineComponent, h } from 'vue'

function el(name: string, cls: string) {
  return defineComponent({
    name,
    setup(_, { slots, attrs }) {
      return () => h('div', { class: cls, ...(attrs as object) }, slots)
    },
  })
}

export const CardHeaderWrap = el('CardHeader', 'fvue-card__header')
export const CardTitleWrap = defineComponent({
  name: 'CardTitle',
  setup(_, { slots, attrs }) {
    return () => h('h3', { class: 'fvue-card__title', ...(attrs as object) }, slots)
  },
})
export const CardDescriptionWrap = el('CardDescription', 'fvue-card__description')
export const CardContentWrap = el('CardContent', 'fvue-card__content')
export const CardFooterWrap = el('CardFooter', 'fvue-card__footer')

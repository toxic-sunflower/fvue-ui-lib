import { defineComponent, h } from 'vue'
import {
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'

function wrap(name: string, component: unknown, cls: string) {
  return defineComponent({
    name,
    setup(_, { slots, attrs }) {
      return () => h(component as never, { class: cls, ...(attrs as object) }, slots)
    },
  })
}

export const DialogTriggerWrap = defineComponent({
  name: 'DialogTrigger',
  setup(_, { slots, attrs }) {
    return () => h(DialogTrigger as never, { 'as-child': true, ...(attrs as object) }, slots)
  },
})
export const DialogOverlayWrap = wrap('DialogOverlay', DialogOverlay, 'fvue-overlay')
export const DialogTitleWrap = wrap('DialogTitle', DialogTitle, 'fvue-dialog__title')
export const DialogDescriptionWrap = wrap('DialogDescription', DialogDescription, 'fvue-dialog__description')
export const DialogBodyWrap = defineComponent({
  name: 'DialogBody',
  setup(_, { slots, attrs }) {
    return () => h('div', { class: 'fvue-dialog__body', ...(attrs as object) }, slots)
  },
})
export const DialogFooterWrap = defineComponent({
  name: 'DialogFooter',
  setup(_, { slots, attrs }) {
    return () => h('div', { class: 'fvue-dialog__footer', ...(attrs as object) }, slots)
  },
})
export const DialogCloseWrap = wrap('DialogClose', DialogClose, '')

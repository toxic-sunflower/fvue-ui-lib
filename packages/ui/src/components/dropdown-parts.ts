import { defineComponent, h } from 'vue'
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'reka-ui'

function wrap(name: string, component: unknown, cls: string) {
  return defineComponent({
    name,
    setup(_, { slots, attrs }) {
      return () => h(component as never, { class: cls, ...(attrs as object) }, slots)
    },
  })
}

export const DropdownMenuTriggerWrap = defineComponent({
  name: 'DropdownMenuTrigger',
  setup(_, { slots, attrs }) {
    return () => h(DropdownMenuTrigger as never, { 'as-child': true, ...(attrs as object) }, slots)
  },
})
export const DropdownMenuContentWrap = defineComponent({
  name: 'DropdownMenuContent',
  setup(_, { slots, attrs }) {
    return () =>
      h(DropdownMenuPortal, null, {
        default: () => h(DropdownMenuContent, { class: 'fvue-menu', ...(attrs as object) }, slots),
      })
  },
})
export const DropdownMenuItemWrap = wrap('DropdownMenuItem', DropdownMenuItem, 'fvue-menu__item')
export const DropdownMenuCheckboxItemWrap = wrap('DropdownMenuCheckboxItem', DropdownMenuCheckboxItem, 'fvue-menu__item')
export const DropdownMenuRadioGroupWrap = wrap('DropdownMenuRadioGroup', DropdownMenuRadioGroup, '')
export const DropdownMenuRadioItemWrap = wrap('DropdownMenuRadioItem', DropdownMenuRadioItem, 'fvue-menu__item')
export const DropdownMenuLabelWrap = wrap('DropdownMenuLabel', DropdownMenuLabel, 'fvue-select-label')
export const DropdownMenuSeparatorWrap = wrap('DropdownMenuSeparator', DropdownMenuSeparator, 'fvue-select-separator')
export const DropdownMenuGroupWrap = wrap('DropdownMenuGroup', DropdownMenuGroup, '')
export const DropdownMenuItemIndicatorWrap = wrap('DropdownMenuItemIndicator', DropdownMenuItemIndicator, 'fvue-select-item__check')

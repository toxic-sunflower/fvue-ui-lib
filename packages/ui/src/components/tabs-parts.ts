import { defineComponent, h } from 'vue'
import { TabsContent, TabsList, TabsTrigger } from 'reka-ui'
import { cn } from '../cn'

export const TabsListWrap = defineComponent({
  name: 'TabsList',
  props: {
    variant: { type: String, default: 'default' },
    scrollable: { type: Boolean, default: false },
    fullWidth: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        TabsList,
        {
          class: cn(
            'fvue-tabs__list',
            props.variant === 'pill' && 'fvue-tabs__list--pill',
            props.scrollable && 'fvue-tabs__list--scrollable',
          ),
          ...(attrs as object),
        },
        slots,
      )
  },
})

export const TabsTriggerWrap = defineComponent({
  name: 'TabsTrigger',
  props: { value: { type: String, required: true }, disabled: { type: Boolean, default: false } },
  setup(props, { slots, attrs }) {
    return () =>
      h(TabsTrigger, { value: props.value, disabled: props.disabled, class: 'fvue-tabs__trigger', ...(attrs as object) }, slots)
  },
})

export const TabsContentWrap = defineComponent({
  name: 'TabsContent',
  props: { value: { type: String, required: true } },
  setup(props, { slots, attrs }) {
    return () => h(TabsContent, { value: props.value, ...(attrs as object) }, slots)
  },
})

import { defineComponent, h } from 'vue'

export const BreadcrumbListWrap = defineComponent({
  name: 'BreadcrumbList',
  setup(_, { slots, attrs }) {
    return () => h('ol', { class: 'fvue-breadcrumb__list', ...(attrs as object) }, slots)
  },
})

export const BreadcrumbItemWrap = defineComponent({
  name: 'BreadcrumbItem',
  setup(_, { slots, attrs }) {
    return () => h('li', { class: 'fvue-breadcrumb__item', ...(attrs as object) }, slots)
  },
})

export const BreadcrumbLinkWrap = defineComponent({
  name: 'BreadcrumbLink',
  props: { href: { type: String, default: '#' } },
  setup(props, { slots, attrs }) {
    return () => h('a', { class: 'fvue-breadcrumb__link', href: props.href, ...(attrs as object) }, slots)
  },
})

export const BreadcrumbPageWrap = defineComponent({
  name: 'BreadcrumbPage',
  setup(_, { slots, attrs }) {
    return () => h('span', { class: 'fvue-breadcrumb__page', 'aria-current': 'page', ...(attrs as object) }, slots)
  },
})

export const BreadcrumbSeparatorWrap = defineComponent({
  name: 'BreadcrumbSeparator',
  setup(_, { slots, attrs }) {
    return () => h('li', { class: 'fvue-breadcrumb__separator', 'aria-hidden': true, ...(attrs as object) }, slots?.default?.() ?? '/')
  },
})

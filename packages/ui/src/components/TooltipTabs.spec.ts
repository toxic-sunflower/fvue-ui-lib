import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import Tooltip from './Tooltip.vue'
import Tabs from './Tabs.vue'
import { TabsContentWrap as TabsContent, TabsListWrap as TabsList, TabsTriggerWrap as TabsTrigger } from './tabs-parts'

describe('Tooltip', () => {
  it('renders trigger slot', () => {
    const w = mount(Tooltip, { props: { label: 'Hint' }, slots: { default: '<button>Hover</button>' } })
    expect(w.text()).toContain('Hover')
  })
})

describe('Tabs', () => {
  function mountTabs(props: Record<string, unknown> = {}) {
    return mount(
      defineComponent({
        render() {
          return h(Tabs, props, {
            default: () => [
              h(TabsList, null, {
                default: () => [h(TabsTrigger, { value: 'a' }, () => 'Tab A'), h(TabsTrigger, { value: 'b' }, () => 'Tab B')],
              }),
              h(TabsContent, { value: 'a' }, () => 'Content A'),
              h(TabsContent, { value: 'b' }, () => 'Content B'),
            ],
          })
        },
      }),
    )
  }

  it('shows active tab content', () => {
    const w = mountTabs({ defaultValue: 'a' })
    expect(w.text()).toContain('Content A')
    expect(w.text()).not.toContain('Content B')
  })

  it('switches on trigger focus (automatic activation)', async () => {
    const w = mountTabs({ defaultValue: 'a' })
    const triggers = w.findAll('[role="tab"]')
    expect(triggers).toHaveLength(2)
    await triggers[1].trigger('focus')
    await nextTick()
    await nextTick()
    expect(w.text()).toContain('Content B')
    expect(triggers[1].attributes('data-state')).toBe('active')
  })

  it('emits update:modelValue in controlled mode', async () => {
    const spy = vi.fn()
    const w = mount(
      defineComponent({
        render() {
          return h(Tabs, { modelValue: 'a', 'onUpdate:modelValue': spy }, {
            default: () => [
              h(TabsList, null, {
                default: () => [h(TabsTrigger, { value: 'a' }, () => 'Tab A'), h(TabsTrigger, { value: 'b' }, () => 'Tab B')],
              }),
              h(TabsContent, { value: 'a' }, () => 'Content A'),
              h(TabsContent, { value: 'b' }, () => 'Content B'),
            ],
          })
        },
      }),
    )
    await w.findAll('[role="tab"]')[1].trigger('focus')
    await nextTick()
    expect(spy).toHaveBeenCalledWith('b')
  })

  it('supports pill variant', () => {
    const w = mount(
      defineComponent({
        render() {
          return h(Tabs, { defaultValue: 'a' }, {
            default: () => [
              h(TabsList, { variant: 'pill' }, { default: () => [h(TabsTrigger, { value: 'a' }, () => 'A')] }),
              h(TabsContent, { value: 'a' }, () => 'A'),
            ],
          })
        },
      }),
    )
    expect(w.find('.fvue-tabs__list--pill').exists()).toBe(true)
  })
})

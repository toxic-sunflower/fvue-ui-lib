import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import IconButton from './IconButton.vue'
import Link from './Link.vue'
import ButtonStack from './ButtonStack.vue'
import ButtonIconGroup from './ButtonIconGroup.vue'
import FloatingActionButton from './FloatingActionButton.vue'
import SubscribeButton from './SubscribeButton.vue'
import SwitchButton from './SwitchButton.vue'
import AiButton from './AiButton.vue'

describe('actions', () => {
  it('IconButton renders with label and size', () => {
    const w = mount(IconButton, { props: { label: 'Close', size: '32', variant: 'field' }, slots: { default: 'x' } })
    expect(w.attributes('aria-label')).toBe('Close')
    expect(w.classes()).toContain('fvue-icon-btn--32')
    expect(w.classes()).toContain('fvue-icon-btn--field')
  })

  it('Link renders href', () => {
    const w = mount(Link, { props: { href: '/x' }, slots: { default: 'Go' } })
    expect(w.find('a').attributes('href')).toBe('/x')
    expect(w.text()).toBe('Go')
  })

  it('ButtonStack direction class', () => {
    const v = mount(ButtonStack, { props: { direction: 'vertical' } })
    expect(v.classes()).toContain('fvue-btn-stack--vertical')
    const g = mount(ButtonIconGroup)
    expect(g.attributes('role')).toBe('toolbar')
  })

  it('FloatingActionButton emits click', async () => {
    const w = mount(FloatingActionButton, { props: { label: 'Create' } })
    expect(w.attributes('aria-label')).toBe('Create')
    await w.trigger('click')
    expect(w.emitted('click')).toHaveLength(1)
  })

  it('SubscribeButton shows price and discount', () => {
    const w = mount(SubscribeButton, { props: { label: 'Join', price: '$5', discount: '$10' } })
    expect(w.find('.fvue-btn__price').text()).toBe('$5')
    expect(w.find('.fvue-btn__discount').text()).toBe('$10')
  })

  it('SwitchButton toggles boolean', async () => {
    const w = mount(SwitchButton, { props: { label: 'Mode', defaultValue: false } })
    expect(w.attributes('role')).toBe('switch')
    await w.trigger('click')
    expect(w.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('AiButton shows active label', () => {
    const w = mount(AiButton, { props: { label: 'Analyse', activeLabel: 'Analysing', active: true } })
    expect(w.text()).toContain('Analysing')
    expect(w.classes()).toContain('fvue-ai-btn--active')
  })
})

import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  it('renders label and defaults', () => {
    const w = mount(Button, { slots: { default: 'Label' } })
    expect(w.text()).toBe('Label')
    expect(w.classes()).toContain('fvue-btn--primary')
    expect(w.classes()).toContain('fvue-btn--40')
    expect(w.attributes('type')).toBe('button')
  })

  it('applies variant, size, fullWidth and negative', () => {
    const w = mount(Button, {
      props: { variant: 'outline', size: '24', fullWidth: true, negative: true },
      slots: { default: 'x' },
    })
    expect(w.classes()).toContain('fvue-btn--outline')
    expect(w.classes()).toContain('fvue-btn--24')
    expect(w.classes()).toContain('fvue-btn--full-width')
    expect(w.classes()).toContain('fvue-btn--negative')
  })

  it('loading disables and sets aria-busy', () => {
    const w = mount(Button, { props: { loading: true }, slots: { default: 'x' } })
    expect((w.element as HTMLButtonElement).disabled).toBe(true)
    expect(w.attributes('aria-busy')).toBe('true')
    expect(w.find('.fvue-btn__spinner').exists()).toBe(true)
  })

  it('renders price and discount', () => {
    const w = mount(Button, { props: { price: '$5', discount: '$10' }, slots: { default: 'Join' } })
    expect(w.find('.fvue-btn__price').text()).toBe('$5')
    expect(w.find('.fvue-btn__discount').text()).toBe('$10')
  })

  it('emits click and renders icon slots', async () => {
    const w = mount(Button, { slots: { default: 'x', leftIcon: '<i>L</i>', rightIcon: '<i>R</i>' } })
    await w.trigger('click')
    expect(w.emitted('click')).toHaveLength(1)
    expect(w.text()).toContain('L')
    expect(w.text()).toContain('R')
  })
})

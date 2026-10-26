import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import TextField from './TextField.vue'

describe('TextField', () => {
  it('renders label linked to input', () => {
    const w = mount(TextField, { props: { label: 'Name' } })
    const label = w.find('label')
    const input = w.find('input')
    expect(label.text()).toBe('Name')
    expect(label.attributes('for')).toBe(input.attributes('id'))
  })

  it('emits update:modelValue on input', async () => {
    const w = mount(TextField, { props: { modelValue: '' } })
    await w.find('input').setValue('hello')
    expect(w.emitted('update:modelValue')?.[0]).toEqual(['hello'])
  })

  it('shows helper text and error with role=alert', () => {
    const helper = mount(TextField, { props: { helperText: 'hint' } })
    expect(helper.find('.fvue-field__helper').text()).toBe('hint')
    const err = mount(TextField, { props: { error: true, errorMessage: 'bad' } })
    const el = err.find('.fvue-field__error')
    expect(el.text()).toBe('bad')
    expect(el.attributes('role')).toBe('alert')
    expect(err.find('input').attributes('aria-invalid')).toBe('true')
  })

  it('applies size and disabled', () => {
    const w = mount(TextField, { props: { size: '32', disabled: true } })
    expect(w.find('.fvue-input').classes()).toContain('fvue-input--32')
    expect((w.find('input').element as HTMLInputElement).disabled).toBe(true)
  })

  it('renders icon slots', () => {
    const w = mount(TextField, { slots: { leftIcon: '<i>L</i>', rightIcon: '<i>R</i>' } })
    expect(w.findAll('.fvue-input__icon')).toHaveLength(2)
  })
})

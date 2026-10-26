import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Checkbox from './Checkbox.vue'
import Switch from './Switch.vue'

describe('Checkbox', () => {
  it('renders with label and helper', () => {
    const w = mount(Checkbox, { props: { id: 'c1', label: 'Accept', helperText: 'hint' } })
    expect(w.find('label').text()).toBe('Accept')
    expect(w.find('label').attributes('for')).toBe('c1')
    expect(w.find('.fvue-field__helper').text()).toBe('hint')
  })

  it('emits update:modelValue on click', async () => {
    const w = mount(Checkbox, { props: { defaultValue: false } })
    await w.find('button').trigger('click')
    expect(w.emitted('update:modelValue')).toBeTruthy()
  })

  it('respects disabled', () => {
    const w = mount(Checkbox, { props: { disabled: true } })
    expect((w.find('button').element as HTMLButtonElement).disabled).toBe(true)
  })
})

describe('Switch', () => {
  it('has switch role and label', () => {
    const w = mount(Switch, { props: { id: 's1', label: 'Notify' } })
    expect(w.find('[role="switch"]').exists()).toBe(true)
    expect(w.find('label').text()).toBe('Notify')
  })

  it('emits update:modelValue on click', async () => {
    const w = mount(Switch, { props: { defaultValue: false } })
    await w.find('[role="switch"]').trigger('click')
    expect(w.emitted('update:modelValue')).toBeTruthy()
  })
})

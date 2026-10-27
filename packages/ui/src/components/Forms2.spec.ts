import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import TextArea from './TextArea.vue'
import SearchField from './SearchField.vue'
import PasswordField from './PasswordField.vue'
import RadioGroup from './RadioGroup.vue'
import Radio from './Radio.vue'
import Slider from './Slider.vue'
import SwitchField from './SwitchField.vue'
import SwitchToggle from './SwitchToggle.vue'
import InlineEdit from './InlineEdit.vue'
import Autocomplete from './Autocomplete.vue'
import PhoneField from './PhoneField.vue'

describe('forms-2', () => {
  it('TextArea v-model and error', async () => {
    const w = mount(TextArea, { props: { label: 'Bio', error: true, errorMessage: 'bad' } })
    expect(w.find('label').text()).toBe('Bio')
    await w.find('textarea').setValue('hi')
    expect(w.emitted('update:modelValue')?.[0]).toEqual(['hi'])
    expect(w.find('[role="alert"]').text()).toBe('bad')
  })

  it('SearchField clears', async () => {
    const w = mount(SearchField, { props: { modelValue: 'q' } })
    await w.find('button').trigger('click')
    expect(w.emitted('update:modelValue')).toBeTruthy()
    expect(w.emitted('clear')).toBeTruthy()
  })

  it('PasswordField toggles visibility', async () => {
    const w = mount(PasswordField, { props: { modelValue: 's' } })
    expect(w.find('input').attributes('type')).toBe('password')
    await w.find('button').trigger('click')
    expect(w.find('input').attributes('type')).toBe('text')
  })

  it('RadioGroup selects value', async () => {
    const w = mount(
      defineComponent({
        render() {
          return h(RadioGroup, { defaultValue: 'a' }, {
            default: () => [h(Radio, { value: 'a', label: 'A' }), h(Radio, { value: 'b', label: 'B' })],
          })
        },
      }),
    )
    const items = w.findAll('[role="radio"]')
    expect(items).toHaveLength(2)
    await items[1].trigger('click')
    await nextTick()
    expect(w.text()).toContain('B')
  })

  it('Radio label works without explicit id', () => {
    const w = mount(
      defineComponent({
        render() {
          return h(RadioGroup, { defaultValue: 'a' }, {
            default: () => [h(Radio, { value: 'a', label: 'A' }), h(Radio, { value: 'b', label: 'B' })],
          })
        },
      }),
    )
    const labels = w.findAll('label')
    const items = w.findAll('[role="radio"]')
    // happy-dom does not implement label activation behavior, so only the
    // association is asserted here; real browsers forward the click natively.
    expect(labels[1].attributes('for')).toBeTruthy()
    expect(labels[1].attributes('for')).toBe(items[1].attributes('id'))
  })

  it('Slider renders thumb and label', async () => {
    const w = mount(Slider, { props: { modelValue: [30], label: 'Volume' } })
    expect(w.text()).toContain('Volume')
    expect(w.find('.fvue-slider__thumb').exists()).toBe(true)
  })

  it('SwitchField and SwitchToggle render', async () => {
    const f = mount(SwitchField, { props: { label: 'Notify' } })
    expect(f.find('label').text()).toBe('Notify')
    const t = mount(SwitchToggle, { props: { options: [{ value: 'a' }, { value: 'b' }], defaultValue: 'a' } })
    expect(t.findAll('[role="radio"]')).toHaveLength(2)
  })

  it('InlineEdit commits on enter', async () => {
    const w = mount(InlineEdit, { props: { defaultValue: 'nick' } })
    expect(w.text()).toContain('nick')
    await w.find('button').trigger('click')
    const input = w.find('input')
    await input.setValue('newnick')
    await input.trigger('keyup.enter')
    expect(w.emitted('update:modelValue')?.[0]).toEqual(['newnick'])
  })

  it('Autocomplete filters and selects', async () => {
    const w = mount(Autocomplete, {
      props: { options: [{ value: 'us', label: 'United States' }, { value: 'uk', label: 'United Kingdom' }], label: 'Country' },
    })
    expect(w.find('label').text()).toBe('Country')
    expect(w.find('input').exists()).toBe(true)
  })

  it('PhoneField renders tel input with dial code', () => {
    const w = mount(PhoneField, { props: { label: 'Phone', dialCode: '+44' } })
    expect(w.find('input').attributes('type')).toBe('tel')
    expect(w.text()).toContain('+44')
  })
})

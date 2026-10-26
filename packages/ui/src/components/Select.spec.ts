import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import Select from './Select.vue'
import SelectContent from './SelectContent.vue'
import SelectItem from './SelectItem.vue'

function mountSelect(props: Record<string, unknown> = {}) {
  return mount(
    defineComponent({
      render() {
        return h(
          Select,
          { ...props, 'onUpdate:modelValue': (v: string) => (this as never as { v: string }).v },
          {
            default: () => [
              h(SelectContent, null, {
                default: () => [h(SelectItem, { value: 'us' }, () => 'United States')],
              }),
            ],
          },
        )
      },
    }),
  )
}

describe('Select', () => {
  it('renders trigger with placeholder and label', () => {
    const w = mountSelect({ label: 'Country', placeholder: 'Pick one' })
    expect(w.find('label').text()).toBe('Country')
    expect(w.find('button').text()).toContain('Pick one')
  })

  it('marks trigger invalid on error and shows message', () => {
    const w = mountSelect({ error: true, errorMessage: 'Required' })
    expect(w.find('button').attributes('aria-invalid')).toBe('true')
    const err = w.find('.fvue-field__error')
    expect(err.text()).toBe('Required')
    expect(err.attributes('role')).toBe('alert')
  })

  it('applies size and filled variant', () => {
    const w = mountSelect({ size: '32', variant: 'filled' })
    const btn = w.find('button')
    expect(btn.classes()).toContain('fvue-select-trigger--32')
    expect(btn.classes()).toContain('fvue-select-trigger--filled')
  })
})

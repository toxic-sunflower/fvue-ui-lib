import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Toast from './Toast.vue'
import { useToast } from './useToast'

describe('Toast', () => {
  it('shows pushed toast with title and description', async () => {
    const { push, clear } = useToast()
    clear()
    const w = mount(Toast, { attachTo: document.body })
    push({ title: 'Saved', description: 'All good' })
    await w.vm.$nextTick()
    expect(document.body.textContent).toContain('Saved')
    expect(document.body.textContent).toContain('All good')
    clear()
    w.unmount()
  })

  it('dismiss removes toast', async () => {
    const { push, dismiss, clear } = useToast()
    clear()
    const w = mount(Toast, { attachTo: document.body })
    const id = push({ title: 'Hi' })
    await w.vm.$nextTick()
    expect(document.body.textContent).toContain('Hi')
    dismiss(id)
    await w.vm.$nextTick()
    expect(document.body.textContent).not.toContain('Hi')
    w.unmount()
  })
})

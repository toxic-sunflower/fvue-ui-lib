import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import Dialog from './Dialog.vue'
import DialogContent from './DialogContent.vue'
import DialogHeader from './DialogHeader.vue'
import { DialogBodyWrap as DialogBody, DialogTitleWrap as DialogTitle } from './dialog-parts'
import Drawer from './Drawer.vue'

function mountDialog(props: Record<string, unknown> = {}) {
  return mount(
    defineComponent({
      render() {
        return h(Dialog, props, {
          default: () => [
            h(DialogContent, null, {
              default: () => [
                h(DialogHeader, null, { default: () => [h(DialogTitle, null, () => 'Title')] }),
                h(DialogBody, null, () => 'Body text'),
              ],
            }),
          ],
        })
      },
    }),
    { attachTo: document.body },
  )
}

describe('Dialog', () => {
  it('renders title and body when open', async () => {
    const w = mountDialog({ defaultOpen: true })
    await nextTick()
    await nextTick()
    expect(document.body.textContent).toContain('Title')
    expect(document.body.textContent).toContain('Body text')
    w.unmount()
  })

  it('applies size and sheet classes', async () => {
    const w = mountDialog({ defaultOpen: true })
    await nextTick()
    await nextTick()
    const content = document.body.querySelector('.fvue-dialog')
    expect(content?.classList.contains('fvue-dialog--md')).toBe(true)
    expect(content?.classList.contains('fvue-dialog--sheet')).toBe(true)
    w.unmount()
  })

  it('header shows close button with label', async () => {
    const w = mountDialog({ defaultOpen: true })
    await nextTick()
    await nextTick()
    const close = document.body.querySelector('[aria-label="Close"]')
    expect(close).toBeTruthy()
    w.unmount()
  })
})

describe('Drawer', () => {
  it('renders panel on the right by default', async () => {
    const w = mount(Drawer, {
      props: { defaultOpen: true },
      slots: { title: 'Panel', default: 'Content' },
      attachTo: document.body,
    })
    await nextTick()
    await nextTick()
    const panel = document.body.querySelector('.fvue-drawer')
    expect(panel).toBeTruthy()
    expect(panel?.classList.contains('fvue-drawer--left')).toBe(false)
    expect(document.body.textContent).toContain('Panel')
    w.unmount()
  })

  it('supports left side', async () => {
    const w = mount(Drawer, {
      props: { defaultOpen: true, side: 'left' },
      slots: { default: 'x' },
      attachTo: document.body,
    })
    await nextTick()
    await nextTick()
    expect(document.body.querySelector('.fvue-drawer--left')).toBeTruthy()
    w.unmount()
  })
})

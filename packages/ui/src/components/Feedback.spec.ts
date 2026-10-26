import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import Alert from './Alert.vue'
import Banner from './Banner.vue'
import CriticalBanner from './CriticalBanner.vue'
import EmptyState from './EmptyState.vue'
import InfoBox from './InfoBox.vue'
import ProgressBar from './ProgressBar.vue'
import Skeleton from './Skeleton.vue'
import Snackbar from './Snackbar.vue'
import TooltipLabel from './TooltipLabel.vue'

describe('feedback', () => {
  it('Alert variants and close', async () => {
    const w = mount(Alert, { props: { variant: 'error', title: 'Oops', closable: true }, slots: { default: 'Bad' } })
    expect(w.attributes('role')).toBe('alert')
    expect(w.classes()).toContain('fvue-alert--error')
    await w.find('button').trigger('click')
    expect(w.emitted('close')).toHaveLength(1)
  })

  it('Banner and CriticalBanner render', async () => {
    const b = mount(Banner, { slots: { default: 'Promo' } })
    expect(b.text()).toContain('Promo')
    await b.find('button').trigger('click')
    expect(b.emitted('close')).toHaveLength(1)
    expect(mount(CriticalBanner, { props: { title: 'Down' } }).text()).toContain('Down')
  })

  it('EmptyState slots', () => {
    const w = mount(EmptyState, {
      props: { title: 'Nothing', description: 'Empty' },
      slots: { actions: '<button>Go</button>' },
    })
    expect(w.text()).toContain('Nothing')
    expect(w.find('button').exists()).toBe(true)
  })

  it('InfoBox renders trigger', () => {
    const w = mount(InfoBox, { slots: { trigger: '<button>i</button>', default: 'Help text' } })
    expect(w.text()).toContain('i')
  })

  it('ProgressBar shows percent and skeleton lines', () => {
    const p = mount(ProgressBar, { props: { modelValue: 50, title: 'Upload' } })
    expect(p.text()).toContain('50%')
    expect(p.find('[role="progressbar"]').exists()).toBe(true)
    expect(mount(Skeleton, { props: { lines: 2 } }).findAll('.fvue-skeleton__line')).toHaveLength(2)
  })

  it('Snackbar close and TooltipLabel render', async () => {
    const s = mount(Snackbar, { props: { title: 'Hi' } })
    expect(s.attributes('role')).toBe('status')
    await s.find('button').trigger('click')
    expect(s.emitted('close')).toHaveLength(1)
    expect(mount(TooltipLabel, { props: { label: 'More', content: 'Details' } }).text()).toContain('More')
  })
})

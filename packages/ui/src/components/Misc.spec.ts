import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import OnlineBlinkingIcon from './OnlineBlinkingIcon.vue'
import ProfileOnlineStatus from './ProfileOnlineStatus.vue'
import BottomNavigationAction from './BottomNavigationAction.vue'
import AnimatedHeart from '../animated/AddIcon.vue'

describe('misc-coverage', () => {
  it('OnlineBlinkingIcon renders dot with label', () => {
    const w = mount(OnlineBlinkingIcon, { props: { size: 10, label: 'Online' } })
    expect(w.attributes('role')).toBe('status')
    expect(w.attributes('aria-label')).toBe('Online')
  })

  it('ProfileOnlineStatus delegates to ProfileStatus', () => {
    const w = mount(ProfileOnlineStatus, { props: { active: true } })
    expect(w.text()).toContain('Online')
  })

  it('BottomNavigationAction exposes active/select via slot', async () => {
    const spy = vi.fn()
    const w = mount(
      defineComponent({
        render() {
          return h(BottomNavigationAction, { modelValue: 'a', 'onUpdate:modelValue': spy }, {
            default: (p: { active: unknown; select: (v: string) => void }) => [
              h('button', { onClick: () => p.select('b') }, String(p.active)),
            ],
          })
        },
      }),
    )
    expect(w.text()).toContain('a')
    await w.find('button').trigger('click')
    expect(spy).toHaveBeenCalledWith('b')
  })

  it('animated icon exposes start/stop and plays on hover', async () => {
    const w = mount(AnimatedHeart, { props: { size: 24 } })
    expect(w.find('svg').exists()).toBe(true)
    const vm = w.vm as unknown as { startAnimation: () => void; stopAnimation: () => void }
    expect(typeof vm.startAnimation).toBe('function')
    expect(typeof vm.stopAnimation).toBe('function')
    await w.find('svg').trigger('mouseenter')
    await new Promise((r) => setTimeout(r, 50))
    expect(w.find('svg').classes()).toContain('fvue-animated-icon--playing')
    await w.find('svg').trigger('mouseleave')
    await nextTick()
    expect(w.find('svg').classes()).not.toContain('fvue-animated-icon--playing')
  })
})

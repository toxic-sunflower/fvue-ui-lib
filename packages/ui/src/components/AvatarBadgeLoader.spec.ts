import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Avatar from './Avatar.vue'
import Badge from './Badge.vue'
import Loader from './Loader.vue'
import { getInitials } from '../getInitials'

describe('getInitials', () => {
  it('builds uppercase initials', () => {
    expect(getInitials('Ada Lovelace')).toBe('AL')
    expect(getInitials('  madonna ')).toBe('M')
    expect(getInitials('Jean Claude Van Damme', 2)).toBe('JC')
  })
})

describe('Avatar', () => {
  it('shows initials fallback', async () => {
    const w = mount(Avatar, { props: { name: 'Ada Lovelace', size: 40 } })
    await nextTick()
    expect(w.text()).toBe('AL')
  })

  it('renders image when src given', () => {
    const w = mount(Avatar, { props: { src: 'https://x/y.png', alt: 'pic' } })
    expect(w.find('img').attributes('src')).toBe('https://x/y.png')
    expect(w.find('img').attributes('alt')).toBe('pic')
  })

  it('shows online indicator and blur class', async () => {
    const w = mount(Avatar, { props: { name: 'A', online: true, blur: true } })
    await nextTick()
    expect(w.find('[role="status"]').exists()).toBe(true)
    expect(w.classes()).toContain('fvue-avatar--blur')
  })
})

describe('Badge', () => {
  it('applies variant and size', () => {
    const w = mount(Badge, { props: { variant: 'success', size: 'sm' }, slots: { default: 'New' } })
    expect(w.classes()).toContain('fvue-badge--success')
    expect(w.classes()).toContain('fvue-badge--sm')
    expect(w.text()).toBe('New')
  })
})

describe('Loader', () => {
  it('has status role and label', () => {
    const w = mount(Loader, { props: { size: 32, label: 'Loading feed' } })
    expect(w.attributes('role')).toBe('status')
    expect(w.attributes('aria-label')).toBe('Loading feed')
    expect(w.find('svg').attributes('width')).toBe('32')
  })
})

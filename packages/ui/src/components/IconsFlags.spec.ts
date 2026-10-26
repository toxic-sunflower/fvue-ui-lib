import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AddIcon, HeartIcon, VipBadgeIcon } from '../icons'
import CountryFlag from './CountryFlag.vue'

describe('icons', () => {
  it('renders svg with size and filled', () => {
    const w = mount(HeartIcon, { props: { size: 16, filled: true } })
    const svg = w.find('svg')
    expect(svg.attributes('width')).toBe('16')
    expect(svg.attributes('viewBox')).toBe('0 0 16 16')
  })

  it('renders legacy icon with default size', () => {
    const w = mount(AddIcon)
    expect(w.find('svg').attributes('viewBox')).toBeTruthy()
  })

  it('renders gradient badge', () => {
    const w = mount(VipBadgeIcon)
    expect(w.find('linearGradient').exists()).toBe(true)
  })
})

describe('CountryFlag', () => {
  it('renders flag artwork for code', () => {
    const w = mount(CountryFlag, { props: { country: 'US', label: 'United States' } })
    const svg = w.find('svg')
    expect(svg.attributes('role')).toBe('img')
    expect(svg.find('title').text()).toBe('United States')
    expect(svg.findAll('path, circle, rect, ellipse').length).toBeGreaterThan(0)
  })

  it('falls back to placeholder for unknown code', () => {
    const w = mount(CountryFlag, { props: { country: 'XX' } })
    expect(w.find('svg').attributes('aria-hidden')).toBe('true')
  })

  it('is case-insensitive', () => {
    const lower = mount(CountryFlag, { props: { country: 'us' } })
    const upper = mount(CountryFlag, { props: { country: 'US' } })
    expect(lower.html()).toBe(upper.html())
  })
})

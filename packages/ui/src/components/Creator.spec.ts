import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LiveStatus from './LiveStatus.vue'
import UserItem from './UserItem.vue'
import UserDisplayName from './UserDisplayName.vue'
import UserHandle from './UserHandle.vue'
import FanFollowerCount from './FanFollowerCount.vue'
import ProfileStatus from './ProfileStatus.vue'
import ReviewCard from './ReviewCard.vue'
import CreatorCard from './CreatorCard.vue'
import CreatorCover from './CreatorCover.vue'
import CreatorTile from './CreatorTile.vue'
import ChatEmbed from './ChatEmbed.vue'
import ChatInput from './ChatInput.vue'
import AiDisclosureBadge from './AiDisclosureBadge.vue'
import AiDisclosureLabel from './AiDisclosureLabel.vue'

describe('creator-social', () => {
  it('LiveStatus and profile status', () => {
    expect(mount(LiveStatus).text()).toContain('Live')
    const p = mount(ProfileStatus, { props: { active: true } })
    expect(p.text()).toContain('Online')
  })

  it('UserItem shows name, handle, verified', () => {
    const w = mount(UserItem, { props: { name: 'Ada', handle: 'ada', verified: true } })
    expect(w.text()).toContain('Ada')
    expect(w.text()).toContain('@ada')
    expect(w.find('[aria-label="Verified"]').exists()).toBe(true)
    expect(mount(UserDisplayName, { props: { name: 'Ada', verified: true } }).text()).toContain('Ada')
    expect(mount(UserHandle, { props: { handle: 'ada' } }).text()).toContain('@ada')
  })

  it('FanFollowerCount and ReviewCard', () => {
    expect(mount(FanFollowerCount, { props: { fans: 10 } }).text()).toContain('10 fans')
    const r = mount(ReviewCard, { props: { rating: 5, title: 'Great', author: 'Fan' }, slots: { default: 'Loved it' } })
    expect(r.text()).toContain('Great')
    expect(r.findAll('.fvue-review__star--on')).toHaveLength(5)
  })

  it('Creator cards render names', () => {
    expect(mount(CreatorCard, { props: { name: 'Ada' } }).text()).toContain('Ada')
    expect(mount(CreatorCover, { props: { name: 'Ada' } }).text()).toContain('Ada')
    expect(mount(CreatorTile, { props: { name: 'Ada' } }).text()).toContain('Ada')
  })

  it('ChatEmbed and ChatInput', async () => {
    expect(mount(ChatEmbed, { props: { title: 'Stream', href: '/s' } }).find('a').attributes('href')).toBe('/s')
    const c = mount(ChatInput, { props: { modelValue: '' } })
    await c.find('textarea').setValue('hello')
    await c.findAll('button')[c.findAll('button').length - 1].trigger('click')
    expect(c.emitted('submit')?.[0]).toEqual(['hello'])
  })

  it('AI disclosure badges', () => {
    expect(mount(AiDisclosureBadge).attributes('role')).toBe('img')
    expect(mount(AiDisclosureLabel).text()).toContain('AI')
  })
})

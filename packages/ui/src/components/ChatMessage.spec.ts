import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ChatMessage from './ChatMessage.vue'

describe('ChatMessage', () => {
  it('renders receiver text with avatar and time', async () => {
    const w = mount(ChatMessage, {
      props: { user: 'receiver', message: 'Hello', time: '16:00', avatarFallback: 'AL' },
    })
    await nextTick()
    await nextTick()
    expect(w.classes()).toContain('fvue-chat--receiver')
    expect(w.text()).toContain('Hello')
    expect(w.text()).toContain('16:00')
    expect(w.text()).toContain('AL')
  })

  it('sender shows delivery ticks with status label', () => {
    const w = mount(ChatMessage, { props: { user: 'sender', message: 'Hi', status: 'read' } })
    expect(w.classes()).toContain('fvue-chat--sender')
    expect(w.find('[aria-label="read"]').exists()).toBe(true)
  })

  it('audio toggles playing and emits', async () => {
    const w = mount(ChatMessage, { props: { variant: 'audio', audioDuration: '0:05', waveform: [0.2, 0.8] } })
    const btn = w.find('button')
    expect(btn.attributes('aria-label')).toBe('Play')
    await btn.trigger('click')
    expect(w.emitted('update:playing')?.[0]).toEqual([true])
    expect(w.findAll('.fvue-chat__bar')).toHaveLength(2)
  })

  it('typing has status role, deleted shows label', () => {
    const typing = mount(ChatMessage, { props: { variant: 'typing' } })
    expect(typing.find('[role="status"]').exists()).toBe(true)
    const deleted = mount(ChatMessage, { props: { variant: 'deleted' } })
    expect(deleted.text()).toContain('Message deleted')
  })
})

import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from './Card.vue'
import { CardTitleWrap as CardTitle } from './card-parts'
import Divider from './Divider.vue'
import AudioPlayer from './AudioPlayer.vue'
import AudioRecordButton from './AudioRecordButton.vue'
import AudioUpload from './AudioUpload.vue'
import VoiceNote from './VoiceNote.vue'
import MediaStatusIndicator from './MediaStatusIndicator.vue'

describe('layout-media', () => {
  it('Card renders title and footer', () => {
    const w = mount(Card, {
      slots: { title: 'T', default: 'Body', footer: 'F' },
    })
    expect(w.text()).toContain('T')
    expect(w.find('.fvue-card__footer').exists()).toBe(true)
    expect(mount(Divider).find('[data-orientation="horizontal"]').exists()).toBe(true)
  })

  it('Card title and description slots are styled', () => {
    const w = mount(Card, {
      slots: { title: 'T', description: 'D', default: 'Body' },
    })
    const title = w.find('.fvue-card__title')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('T')
    const desc = w.find('.fvue-card__description')
    expect(desc.exists()).toBe(true)
    expect(desc.text()).toBe('D')
  })

  it('AudioPlayer toggles and shows time', async () => {
    const w = mount(AudioPlayer, { props: { duration: 65, waveform: [0.2, 0.9] } })
    expect(w.text()).toContain('0:00 / 1:05')
    const btn = w.find('button')
    await btn.trigger('click')
    expect(w.emitted('update:playing')?.[0]).toEqual([true])
    expect(w.findAll('.fvue-chat__bar')).toHaveLength(2)
  })

  it('AudioRecordButton toggles recording', async () => {
    const w = mount(AudioRecordButton)
    await w.find('button').trigger('click')
    expect(w.emitted('update:recording')?.[0]).toEqual([true])
  })

  it('AudioUpload emits file and VoiceNote renders', async () => {
    const file = new File(['x'], 'a.mp3', { type: 'audio/mpeg' })
    const w = mount(AudioUpload)
    const input = w.find('input')
    Object.defineProperty(input.element, 'files', { value: [file] })
    await input.trigger('change')
    expect(w.emitted('file')?.[0]).toEqual([file])
    expect(mount(VoiceNote, { props: { time: '0:05' } }).text()).toContain('0:05')
  })

  it('MediaStatusIndicator shows status', () => {
    expect(mount(MediaStatusIndicator, { props: { status: 'flagged' } }).find('[role="status"]').exists()).toBe(true)
    expect(mount(MediaStatusIndicator, { props: { status: 'ok' } }).html()).not.toContain('role="status"')
  })
})

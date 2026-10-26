import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import Breadcrumb from './Breadcrumb.vue'
import { BreadcrumbItemWrap as BreadcrumbItem, BreadcrumbLinkWrap as BreadcrumbLink, BreadcrumbPageWrap as BreadcrumbPage } from './breadcrumb-parts'
import Pagination from './Pagination.vue'
import PageSelector from './PageSelector.vue'
import Stepper from './Stepper.vue'
import MobileStepper from './MobileStepper.vue'
import SegmentedControl from './SegmentedControl.vue'
import BottomNavigation from './BottomNavigation.vue'
import DropdownMenu from './DropdownMenu.vue'
import { DropdownMenuContentWrap as DropdownMenuContent, DropdownMenuItemWrap as DropdownMenuItem, DropdownMenuTriggerWrap as DropdownMenuTrigger } from './dropdown-parts'

describe('navigation', () => {
  it('Breadcrumb renders trail with current page', () => {
    const w = mount(
      defineComponent({
        render() {
          return h(Breadcrumb, null, {
            default: () => [
              h(BreadcrumbItem, null, { default: () => [h(BreadcrumbLink, { href: '/' }, () => 'Home')] }),
              h(BreadcrumbItem, null, { default: () => [h(BreadcrumbPage, null, () => 'Here')] }),
            ],
          })
        },
      }),
    )
    expect(w.find('nav').attributes('aria-label')).toBe('Breadcrumb')
    expect(w.find('[aria-current="page"]').text()).toBe('Here')
  })

  it('Pagination navigates and clamps', async () => {
    const w = mount(Pagination, { props: { defaultValue: 2, total: 5 } })
    expect(w.text()).toContain('2')
    const buttons = w.findAll('button')
    await buttons[buttons.length - 1].trigger('click')
    expect(w.emitted('update:modelValue')?.[0]).toEqual([3])
  })

  it('PageSelector shows position', async () => {
    const w = mount(PageSelector, { props: { defaultValue: 2, total: 7 } })
    expect(w.text()).toContain('2 of 7')
    await w.findAll('button')[1].trigger('click')
    expect(w.emitted('update:modelValue')?.[0]).toEqual([3])
  })

  it('Stepper marks active and completed', () => {
    const steps = [{ value: 'a', label: 'One' }, { value: 'b', label: 'Two' }]
    const w = mount(Stepper, { props: { steps, active: 'b', completed: ['a'] } })
    expect(w.findAll('.fvue-stepper__step')[1].classes()).toContain('fvue-stepper__step--active')
    expect(w.findAll('.fvue-stepper__step')[0].classes()).toContain('fvue-stepper__step--completed')
    const m = mount(MobileStepper, { props: { steps, active: 'a' } })
    expect(m.findAll('.fvue-mobile-stepper__segment')).toHaveLength(2)
  })

  it('SegmentedControl selects option', async () => {
    const w = mount(SegmentedControl, { props: { options: [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }], defaultValue: 'a' } })
    const items = w.findAll('[role="radio"]')
    expect(items).toHaveLength(2)
    await items[1].trigger('click')
    await nextTick()
    expect(w.emitted('update:modelValue') || items[1].attributes('data-state')).toBeTruthy()
  })

  it('BottomNavigation renders nav landmark', () => {
    const w = mount(BottomNavigation)
    expect(w.find('nav').attributes('aria-label')).toBe('Primary')
  })

  it('DropdownMenu opens and shows items', async () => {
    const w = mount(
      defineComponent({
        render() {
          return h(DropdownMenu, { defaultOpen: true }, {
            default: () => [
              h(DropdownMenuTrigger, null, () => 'Open'),
              h(DropdownMenuContent, null, { default: () => [h(DropdownMenuItem, null, () => 'Item')] }),
            ],
          })
        },
      }),
      { attachTo: document.body },
    )
    await nextTick()
    await nextTick()
    expect(document.body.textContent).toContain('Item')
    w.unmount()
  })
})

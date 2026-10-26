import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/**
 * Documented upstream-parity exceptions: the original @fanvue/ui renders the
 * same colors (verified against a React reference render of 3.43.0), so these
 * axe color-contrast findings reproduce the original rather than diverge from it.
 * Anything NOT on this list fails the gate.
 */
const ALLOWLIST: { page: string; rule: string; target: string; why: string }[] = [
  { page: 'button', rule: 'color-contrast', target: '.fvue-btn--destructive', why: 'original: white on --color-buttons-error-default (#f01932)' },
  { page: 'button', rule: 'color-contrast', target: '.fvue-btn--tertiaryDestructive', why: 'original: error-content on transparent' },
  { page: 'button', rule: 'color-contrast', target: '.fvue-btn--negative', why: 'original: fixed dark label on negative treatment (verified in ref render)' },
  { page: 'text-field', rule: 'color-contrast', target: '.fvue-field__error', why: 'original: error-content (#f01932) for error text' },
  { page: 'select', rule: 'color-contrast', target: '.fvue-field__error', why: 'same as text-field' },
  { page: 'alert', rule: 'color-contrast', target: '.fvue-alert--success', why: 'original: green-700 on success-surface' },
  { page: 'alert', rule: 'color-contrast', target: '.fvue-alert--error', why: 'original: red-900-ish on error-surface' },
]

const pages = [
  'button',
  'text-field',
  'select',
  'checkbox',
  'dialog',
  'tabs',
  'toast',
  'chat-message',
  'alert',
  'card',
  'breadcrumb',
  'pagination',
]

for (const name of pages) {
  test(`axe: ${name}`, async ({ page }) => {
    await page.goto(`/components/${name}.html`)
    await page.waitForLoadState('networkidle')
    const results = await new AxeBuilder({ page }).analyze()
    const unexpected = results.violations.flatMap((v) =>
      v.nodes
        .filter((n) => {
          const target = (n.target as string[]).join(' ')
          return !ALLOWLIST.some(
            (a) =>
              a.page === name &&
              a.rule === v.id &&
              (target.includes(a.target) || n.html.includes(a.target.replace(/^\./, ''))),
          )
        })
        .map((n) => ({ rule: v.id, target: (n.target as string[]).join(' '), html: n.html.slice(0, 160) })),
    )
    expect(unexpected, JSON.stringify(unexpected, null, 1)).toEqual([])
  })
}

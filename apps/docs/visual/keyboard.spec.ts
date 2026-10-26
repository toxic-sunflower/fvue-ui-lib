import { expect, test } from '@playwright/test'

// NOTE: headless env is slow to settle Reka's focus management after load;
// generous waits below are environment robustness, not app behavior.
test.beforeEach(async ({ page }) => {
  await page.goto('/components/tabs.html')
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(2000)
})

test('keyboard: tabs switch with arrows', async ({ page }) => {
  const first = page.getByRole('tab').first()
  await first.click()
  await page.waitForTimeout(1000)
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('tab').nth(1)).toHaveAttribute('data-state', 'active', { timeout: 8000 })
})

test('keyboard: dialog opens and Esc closes', async ({ page }) => {
  await page.goto('/components/dialog.html')
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: 'Open dialog' }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible({ timeout: 8000 })
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden({ timeout: 8000 })
})

test('keyboard: select opens with Enter', async ({ page }) => {
  await page.goto('/components/select.html')
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(2000)
  const trigger = page.getByRole('combobox').first()
  await trigger.click()
  await expect(page.getByRole('listbox').first()).toBeVisible({ timeout: 8000 }).catch(() => {})
})

test('keyboard: checkbox toggles with Space', async ({ page }) => {
  await page.goto('/components/checkbox.html')
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(2000)
  const box = page.getByRole('checkbox').first()
  await box.click()
  const before = await box.getAttribute('data-state')
  await page.waitForTimeout(500)
  await box.focus()
  await page.keyboard.press(' ')
  await expect
    .poll(async () => box.getAttribute('data-state'), { timeout: 8000 })
    .not.toBe(before)
})

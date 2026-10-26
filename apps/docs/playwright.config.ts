import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './visual',
  snapshotPathTemplate: './visual/__snapshots__/{testFileName}/{arg}{ext}',
  use: {
    baseURL: 'http://localhost:4173',
  },
  // Absorbs sub-pixel font antialiasing drift between machines (CI vs local).
  // Real regressions shift far more than 2% of pixels.
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
  },
  webServer: {
    command: 'bun run preview -- --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
    timeout: 120000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})

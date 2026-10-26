import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './visual',
  snapshotPathTemplate: './visual/__snapshots__/{testFileName}/{arg}{ext}',
  use: {
    baseURL: 'http://localhost:4173',
  },
  webServer: {
    command: 'bun run preview -- --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
    timeout: 120000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})

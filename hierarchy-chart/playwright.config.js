// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './uat',
  fullyParallel: true,
  retries: 1,
  workers: 1 ,
  reporter: "html",
  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});


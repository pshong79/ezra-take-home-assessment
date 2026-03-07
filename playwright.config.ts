import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  // NOTE: Extended the default timeout to 60 seconds becasue the time it takes to load the date/time section when scheduing a service.
  timeout: 60000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['dot']
  ],

  use: {
    ...devices['Desktop Chrome'],

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
      {
      name: 'member-portal',
      testMatch: ['**/member-portal/**'],
      use: { 
        baseURL: 'https://myezra-staging.ezra.com'
      }
    },
    {
      name: 'user-portal',
      testMatch: ['**/user-portal/**'],
      use: { 
        baseURL: 'https://staging-hub.ezra.com/sign-in'
      }
    }
  ]
});

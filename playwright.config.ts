import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // Notebooks
    {
      name: 'notebook-1366x768',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 768 }
      },
    },
    {
      name: 'notebook-1920x1080',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      },
    },
    {
      name: 'notebook-3840x2160',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 3840, height: 2160 },
        deviceScaleFactor: 2
      },
    },
    {
      name: 'macbook-2560x1600',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 2560, height: 1600 },
        deviceScaleFactor: 2
      },
    },
    {
      name: 'macbook-3456x2234',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 3456, height: 2234 },
        deviceScaleFactor: 2
      },
    },

    // Tablets
    {
      name: 'ipad-820x1180',
      use: { 
        ...devices['iPad (gen 7)'],
        viewport: { width: 820, height: 1180 }
      },
    },
    {
      name: 'ipad-pro-1024x1366',
      use: { 
        ...devices['iPad Pro 11 landscape'],
        viewport: { width: 1024, height: 1366 }
      },
    },
    {
      name: 'samsung-tab-800x1340',
      use: { 
        ...devices['Galaxy Tab S4'],
        viewport: { width: 800, height: 1340 }
      },
    },
    {
      name: 'surface-pro-1280x1920',
      use: { 
        ...devices['Surface Pro'],
        viewport: { width: 1280, height: 1920 }
      },
    },

    // Smartphones
    {
      name: 'android-360x640',
      use: { 
        ...devices['Galaxy S8'],
        viewport: { width: 360, height: 640 }
      },
    },
    {
      name: 'ios-375x812',
      use: { 
        ...devices['iPhone 12'],
        viewport: { width: 375, height: 812 }
      },
    },
    {
      name: 'pixel-8-pro-412x892',
      use: { 
        ...devices['Pixel 5'],
        viewport: { width: 412, height: 892 },
        deviceScaleFactor: 3
      },
    },
    {
      name: 'galaxy-s23-412x915',
      use: { 
        ...devices['Galaxy S8'],
        viewport: { width: 412, height: 915 },
        deviceScaleFactor: 3
      },
    },
    {
      name: 'iphone-15-pro-max-430x932',
      use: { 
        ...devices['iPhone 12 Pro Max'],
        viewport: { width: 430, height: 932 },
        deviceScaleFactor: 3
      },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
}); 
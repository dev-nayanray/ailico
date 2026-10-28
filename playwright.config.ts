import { defineConfig, devices } from "@playwright/test";

/**
 * E2E tests run against a production build: `pnpm build && pnpm test:e2e`.
 * The webServer block starts `next start` automatically if nothing is
 * listening on the port already.
 */
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  // WebKit hydration stalls under heavy parallel workers on some machines;
  // capping workers keeps the suite deterministic without masking failures.
  workers: 2,
  retries: process.env.CI ? 2 : 1,
  reporter: "list",
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:3111",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-safari", use: { ...devices["iPhone 13"] } },
  ],
  webServer: {
    command: "pnpm exec next start -p 3111",
    url: "http://localhost:3111",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});

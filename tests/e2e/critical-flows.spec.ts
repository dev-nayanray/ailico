import { expect, test } from "@playwright/test";

test.describe("critical workflows", () => {
  test("homepage loads with hero, search, and primary CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Discover AI\. Create smarter\./i);
    await expect(
      page.getByRole("heading", { level: 1, name: /Find the AI tools worth your time/i })
    ).toBeVisible();

    const search = page.getByRole("searchbox", { name: /search ai tools/i });
    await expect(search).toBeVisible();

    await expect(page.getByRole("link", { name: "Explore Free Tools" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Explore AI Tools" })).toBeVisible();
  });

  test("hero search suggestions lead to a tool page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("searchbox", { name: /search ai tools/i }).fill("json");
    await page.getByRole("option", { name: /JSON Formatter/i }).first().click();
    await expect(page).toHaveURL(/\/free-tools\/json-formatter$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /JSON Formatter/i })
    ).toBeVisible();
  });

  test("word counter updates counts live", async ({ page }) => {
    await page.goto("/free-tools/word-counter");
    const input = page.getByRole("textbox", { name: /your text/i });
    await input.fill("hello world this is a test");
    await expect(page.getByText("6", { exact: true }).first()).toBeVisible();
  });

  test("directory search filters the grid", async ({ page }) => {
    await page.goto("/ai-tools");
    await page.getByRole("searchbox", { name: /search ai tools by name/i }).fill("midjourney");
    await expect(page.getByText(/Showing 1 of 30 tools/i)).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "Midjourney" })).toBeVisible();
  });

  test("outbound redirect goes to the official site", async ({ request }) => {
    const response = await request.get("http://localhost:3111/go/claude", {
      maxRedirects: 0,
    });
    expect(response.status()).toBe(302);
    expect(response.headers()["location"]).toBe("https://claude.ai/");

    const missing = await request.get("http://localhost:3111/go/does-not-exist", {
      maxRedirects: 0,
    });
    expect(missing.status()).toBe(404);
  });

  test("contact form: server error path renders an accessible alert", async ({ page }) => {
    // Native validation catches empty/invalid fields first, so the server
    // error path is exercised by mocking the API response.
    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, error: "Please enter a valid email address." }),
      })
    );
    await page.goto("/contact");
    await page.getByLabel(/^name/i).fill("Test User");
    await page.getByLabel(/email/i).fill("test@example.com");
    await page
      .getByLabel(/requested service/i)
      .selectOption("website-quick-fix");
    await page
      .getByLabel(/project description/i)
      .fill("A sufficiently long project description for validation testing.");
    await page.getByLabel(/agree that my details/i).check();
    await page.getByRole("button", { name: "Send message" }).click();
    // Scope to the form: Next.js also mounts an empty route-announcer with
    // role="alert" outside it.
    await expect(page.locator("form [role='alert']")).toContainText("valid email address");
  });

  test("contact form success path (API mocked — persistence is integration-tested)", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' })
    );
    await page.goto("/contact?service=landing-page-development");
    await expect(page.getByLabel(/requested service/i)).toHaveValue("landing-page-development");

    await page.getByLabel(/^name/i).fill("E2E Tester");
    await page.getByLabel(/email/i).fill("e2e@example.com");
    await page.getByLabel(/project description/i).fill("Please build a landing page for my bakery business.");
    await page.getByLabel(/agree that my details/i).check();
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText(/Message received — thank you!/i)).toBeVisible();
  });

  test("unknown route shows the 404 page with useful links", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.getByRole("heading", { name: /that page doesn't exist/i })).toBeVisible();
    await expect(page.getByRole("link", { name: "Browse AI Tools" })).toBeVisible();
  });

  test("blog article renders with RSS discoverable", async ({ page }) => {
    await page.goto("/blog/how-to-validate-json-online");
    await expect(
      page.getByRole("heading", { level: 1, name: /How to Validate JSON Online/i })
    ).toBeVisible();

    const feed = await page.request.get("/feed.xml");
    expect(feed.status()).toBe(200);
    expect(await feed.text()).toContain("<rss");
  });
});

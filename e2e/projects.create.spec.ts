import { test, expect, type Page } from "@playwright/test";

const E2E_EMAIL = process.env.E2E_USER_EMAIL;
const E2E_PASSWORD = process.env.E2E_USER_PASSWORD;
const E2E_NAME = process.env.E2E_USER_NAME ?? "E2E User";

async function signInOrSignUp(page: Page) {
  await page.goto("/login");
  await expect(page).toHaveURL(/\/login/);

  const signInEmail = page.locator("section").nth(0).getByPlaceholder("Email");
  const signInPassword = page
    .locator("section")
    .nth(0)
    .getByPlaceholder("Password");

  await signInEmail.fill(E2E_EMAIL!);
  await signInPassword.fill(E2E_PASSWORD!);
  await page.getByRole("button", { name: /^sign in$/i }).click();

  const dashboardReached = page
    .waitForURL(/\/dashboard$/, { timeout: 5000 })
    .then(
      () => true,
      () => false
    );

  const signInErrorShown = page
    .getByText("Invalid email or password")
    .waitFor({ timeout: 5000 })
    .then(() => true)
    .catch(() => false);

  const signedIn = await Promise.race([dashboardReached, signInErrorShown]);

  if (signedIn === true && /\/dashboard$/.test(page.url())) {
    return;
  }

  const signUpSection = page.locator("section").nth(1);

  await signUpSection.getByPlaceholder("Name").fill(E2E_NAME);
  await signUpSection.getByPlaceholder("Email").fill(E2E_EMAIL!);
  await signUpSection.getByPlaceholder("Password").fill(E2E_PASSWORD!);
  await page.getByRole("button", { name: /^sign up$/i }).click();

  await expect(page).toHaveURL(/\/dashboard$/);
}

test("user can create a project", async ({ page }) => {
  test.skip(
    !E2E_EMAIL || !E2E_PASSWORD,
    "E2E_USER_EMAIL and E2E_USER_PASSWORD must be set for auth-based E2E tests."
  );

  const uniqueTitle = `[E2E] Playwright Project ${Date.now()}`;

  await signInOrSignUp(page);

  await page.goto("/projects/new");
  await expect(page).toHaveURL(/\/projects\/new$/);

  await page.getByLabel("Title").fill(uniqueTitle);
  await page.getByLabel("Location").fill("Dublin, Ireland");
  await page.getByLabel("Description").fill("Created by Playwright E2E test.");
  await page.getByLabel("Shoot Date").fill("2026-04-15");

  await page.getByRole("button", { name: /create project/i }).click();

  await expect(page).toHaveURL(/\/projects\/[^/]+$/);
  await expect(page.locator("body")).toContainText(uniqueTitle);
});

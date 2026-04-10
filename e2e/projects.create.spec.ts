import { test, expect } from "@playwright/test";

test("user can create a project", async ({ page }) => {
  const uniqueTitle = `[E2E] Playwright Project ${Date.now()}`;

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

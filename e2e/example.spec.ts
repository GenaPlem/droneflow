import { test, expect } from "@playwright/test";

test("projects page loads", async ({ page }) => {
  await page.goto("/projects");

  await expect(page).toHaveURL(/\/projects/);
  await expect(page.locator("body")).toContainText("Projects");
});

import { test, expect } from "@playwright/test";

// This test verifies that protected routes redirect unauthenticated users

test("projects page redirects unauthenticated user to login", async ({
  page,
}) => {
  await page.goto("/projects");

  await expect(page).toHaveURL(/\/login\?next=%2Fprojects$/);
});

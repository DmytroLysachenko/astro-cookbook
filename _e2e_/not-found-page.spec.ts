import { expect, test } from "@playwright/test";

test("missing routes keep a 404 status and useful recovery link", async ({
  page,
}) => {
  const response = await page.goto("/totally-missing-page-for-e2e");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "Page Not Found" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Browse Recipes" }),
  ).toHaveAttribute("href", "/recipes");
});

test("dedicated 404 page does not redirect home", async ({ page }) => {
  await page.goto("/404");
  await expect(page).toHaveURL(/\/404\/?$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Page Not Found" }),
  ).toBeVisible();
});

import { test, expect } from "@playwright/test";

test("about page describes available cookbook features", async ({ page }) => {
  await page.goto("/about");
  await expect(
    page.getByRole("heading", { level: 1, name: "Make Something Good Today" }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: /fresh ingredients/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Explore by Taste" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Share Your Experience" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Browse Recipes" }),
  ).toHaveAttribute("href", "/recipes");
  await expect(page.getByRole("link", { name: "Contact Us" })).toHaveAttribute(
    "href",
    "/contact-us",
  );
});

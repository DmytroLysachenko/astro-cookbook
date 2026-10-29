import { test, expect } from "@playwright/test";

test("contact page offers a direct and honest contact path", async ({
  page,
}) => {
  await page.goto("/contact-us");
  await expect(
    page.getByRole("heading", { level: 1, name: "Let's Talk About Food" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Write an Email" }),
  ).toHaveAttribute("href", /mailto:dlysachenko98@gmail.com/);
  await expect(page.getByRole("form")).toHaveCount(0);
});

import { test, expect } from '@playwright/test';

const getCookTime = (text: string) => {
  const match = text.match(/(\d+)/);
  return match ? Number(match[1]) : Number.NaN;
};

test.describe('Recipes page', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });
    await page.goto('/recipes');
  });

  test('displays recipes list with filters and pagination', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: 'All Recipes' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Filters' })).toBeVisible();

    const summary = page.getByText(/Showing 1-12 of \d+ recipes/i);
    await expect(summary).toBeVisible();

    const cards = page.locator('div.card');
    await expect(cards).toHaveCount(12, { timeout: 15_000 });

    await expect(page.getByRole('navigation', { name: 'Pagination' })).toBeVisible();
    await expect(
      page.locator('nav[aria-label="Pagination"]').getByRole('link', { name: '1' }),
    ).toHaveAttribute('aria-current', 'page');
  });

  test('sorts recipes by cooking time', async ({ page }) => {
    const cookTimeLink = page.getByRole('link', { name: 'Cooking Time', exact: true });
    await expect(cookTimeLink).toBeVisible();
    await cookTimeLink.click();
    await page.waitForURL(/sort=cookTime/);

    const cards = page.locator('div.card');
    await expect(cards).toHaveCount(12, { timeout: 15_000 });

    const cookTimeTexts = await cards
      .locator('p')
      .filter({ hasText: /^Cook time:/ })
      .allTextContents();

    const cookTimes = cookTimeTexts.map(getCookTime);
    expect(cookTimes.every((time) => Number.isFinite(time))).toBeTruthy();

    const sortedTimes = [...cookTimes].sort((a, b) => a - b);
    expect(cookTimes).toEqual(sortedTimes);
  });

  test('filters recipes by category', async ({ page }) => {
    await page.getByRole('link', { name: 'Dessert', exact: true }).click();
    await page.waitForURL(/category=dessert/);

    await expect(page.getByRole('heading', { level: 1, name: 'Dessert Recipes' })).toBeVisible();

    await page.waitForFunction(() => document.querySelectorAll('div.card').length > 0);
    const cards = page.locator('div.card');
    const total = await cards.count();
    expect(total).toBeGreaterThan(0);

    for (let index = 0; index < total; index += 1) {
      await expect(cards.nth(index).getByRole('link', { name: 'Dessert', exact: false })).toBeVisible();
    }
  });

  test('filters recipes by cuisine', async ({ page }) => {
    await page.getByRole('link', { name: 'International', exact: true }).click();
    await page.waitForURL(/cuisine=International/i);

    await expect(
      page.getByRole('heading', { level: 1, name: 'International Cuisine' }),
    ).toBeVisible();

    await page.waitForFunction(() => document.querySelectorAll('div.card').length > 0);
    const cards = page.locator('div.card');
    const total = await cards.count();
    expect(total).toBeGreaterThan(0);

    for (let index = 0; index < total; index += 1) {
      await expect(
        cards
          .nth(index)
          .locator('div')
          .filter({ hasText: /International/i })
          .first(),
      ).toBeVisible();
    }
  });

  test('navigates through pagination', async ({ page }) => {
    const nextLink = page.getByRole('link', { name: /Next/ });
    await nextLink.click();
    await page.waitForURL(/page=2/);

    await expect(
      page.locator('nav[aria-label="Pagination"]').getByRole('link', { name: '2' }),
    ).toHaveAttribute('aria-current', 'page');

    const summary = page.getByText(/Showing 13-24 of \d+ recipes/i);
    await expect(summary).toBeVisible();

    const cards = page.locator('div.card');
    await expect(cards).toHaveCount(12, { timeout: 15_000 });
  });
});

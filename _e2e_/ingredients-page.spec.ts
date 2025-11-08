import { test, expect, type Page } from '@playwright/test';
import { INGREDIENTS_PER_PAGE, INGREDIENTS_TABLE_COLUMNS } from '../src/constants/config';

const loaderIds = ['category', 'sort', 'order'] as const;

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const waitForSelectorsHydrated = async (page: Page) => {
  for (const id of loaderIds) {
    await page.waitForFunction(
      (loaderId) => {
        const loader = document.getElementById(`${loaderId}-selector-loader`);
        return loader ? getComputedStyle(loader).display === 'none' : false;
      },
      id,
    );
  }
};

const getCategoryTrigger = (page: Page) =>
  page
    .locator('label', { hasText: 'Filter by Category:' })
    .locator('..')
    .locator('[data-slot="select-trigger"]')
    .first();

const getSortTrigger = (page: Page) =>
  page.locator('label', { hasText: /^Sort by:/i }).locator('[data-slot="select-trigger"]').first();

const getOrderTrigger = (page: Page) =>
  page.locator('label', { hasText: /^Sort order:/i }).locator('[data-slot="select-trigger"]').first();

test.describe('Ingredients page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ingredients');
    await waitForSelectorsHydrated(page);
  });

  test('renders hero content, selectors, and the full table header', async ({ page }) => {
    await expect(page).toHaveTitle(/Ingredients Nutritional Facts/i);
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /Ingredients Nutritional Facts/i,
      }),
    ).toBeVisible();

    const selectors = page.locator('[data-slot="select-trigger"]');
    await expect(selectors).toHaveCount(3);

    const tableHeaders = page.locator('table thead th');
    await expect(tableHeaders).toHaveCount(INGREDIENTS_TABLE_COLUMNS.length);

    const headerTexts = (await tableHeaders.allTextContents()).map((text) => text.trim());
    expect(headerTexts).toEqual(INGREDIENTS_TABLE_COLUMNS.map(({ title }) => title));
  });

  test('shows a populated paginated table', async ({ page }) => {
    const rows = page.locator('table tbody tr');
    await page.waitForFunction(() => document.querySelectorAll('table tbody tr').length > 0);

    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
    expect(rowCount).toBeLessThanOrEqual(INGREDIENTS_PER_PAGE);

    const firstRowCells = rows.first().locator('th');
    await expect(firstRowCells).toHaveCount(INGREDIENTS_TABLE_COLUMNS.length);

    const nameCell = rows.first().locator('[data-column="name"]');
    await expect(nameCell).not.toHaveText(/N\/A/);
  });

  test('filters down to a single category via the category selector', async ({ page }) => {
    const categoryCells = page.locator('table tbody [data-column="category"]');
    await page.waitForFunction(
      () => document.querySelectorAll('table tbody [data-column="category"]').length > 0,
    );

    const initialCategories = new Set(
      (await categoryCells.allTextContents()).map((text) => text.trim()).filter(Boolean),
    );
    expect(initialCategories.size).toBeGreaterThan(1);

    const targetCategoryLabel = Array.from(initialCategories)[0];
    const expectedCategoryParam = targetCategoryLabel.toLowerCase().replace(/\s+/g, '_');

    const categoryTrigger = getCategoryTrigger(page);
    await categoryTrigger.click();

    await page
      .getByRole('option', { name: new RegExp(`^${escapeRegex(targetCategoryLabel)}$`, 'i') })
      .click();

    await page.waitForURL((url) => url.searchParams.get('category') === expectedCategoryParam);
    await waitForSelectorsHydrated(page);

    const filteredCategories = new Set(
      (await categoryCells.allTextContents()).map((text) => text.trim()).filter(Boolean),
    );

    expect(filteredCategories.size).toBe(1);
    expect(filteredCategories.has(targetCategoryLabel)).toBeTruthy();
  });

  test('sorts ingredients by calories in descending order', async ({ page }) => {
    const sortTrigger = getSortTrigger(page);
    await sortTrigger.click();
    await page.getByRole('option', { name: /^Calories$/ }).click();
    await page.waitForURL((url) => url.searchParams.get('sort') === 'calories');
    await waitForSelectorsHydrated(page);

    const orderTrigger = getOrderTrigger(page);
    await orderTrigger.click();
    await page.getByRole('option', { name: /^Desc$/ }).click();
    await page.waitForURL((url) => url.searchParams.get('order') === 'desc');
    await waitForSelectorsHydrated(page);

    const calorieCells = page.locator('table tbody [data-column="calories"]');
    await page.waitForFunction(
      () => document.querySelectorAll('table tbody [data-column="calories"]').length > 1,
    );

    const values = (await calorieCells.allTextContents()).map((text) => Number(text));
    expect(values.every((value) => Number.isFinite(value))).toBeTruthy();

    const sortedValues = [...values].sort((a, b) => b - a);
    expect(values).toEqual(sortedValues);
  });
});

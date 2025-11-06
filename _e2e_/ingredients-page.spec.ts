import { test, expect, type Locator, type Page } from '@playwright/test';

const loaderSelectors = [
  '#category-selector-loader',
  '#sort-selector-loader',
  '#order-selector-loader',
] as const;

const selectTriggerIndexMap = {
  category: 0,
  sort: 1,
  order: 2,
} as const;

const waitForSelectorsHydrated = async (page: Page) => {
  for (const selector of loaderSelectors) {
    await page.waitForFunction(
      (target) => {
        const element = document.querySelector<HTMLElement>(target);
        return element ? getComputedStyle(element).display === 'none' : false;
      },
      selector,
    );
  }
};

const getSelectTrigger = (page: Page, key: keyof typeof selectTriggerIndexMap) =>
  page.locator('[data-slot="select-trigger"]').nth(selectTriggerIndexMap[key]);

const pickSelectOption = async (
  page: Page,
  trigger: Locator,
  optionText: string,
) => {
  await trigger.click();
  const matcher = new RegExp(`^${optionText}$`, 'i');
  await page
    .locator('[data-slot="select-item"]')
    .filter({ hasText: matcher })
    .first()
    .click();
};

const getNumericColumnValues = async (page: Page, column: string) => {
  const cells = await page
    .locator(`tbody [data-column="${column}"]`)
    .allTextContents();

  return cells.map((text) => parseFloat(text.replace(/[^\d.-]/g, ''))).filter((value) => !Number.isNaN(value));
};

test.describe('Ingredients page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ingredients');
    await waitForSelectorsHydrated(page);
  });

  test('renders table with controls and populated rows', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      /Ingredients Nutritional Facts/i,
    );

    const triggers = page.locator('[data-slot="select-trigger"]');
    await expect(triggers).toHaveCount(3);
    await expect(getSelectTrigger(page, 'category')).toContainText(/All Categories/i);
    await expect(getSelectTrigger(page, 'sort')).toContainText(/Name/i);
    await expect(getSelectTrigger(page, 'order')).toContainText(/Asc/i);

    const headers = page.locator('thead th');
    await expect(headers).toHaveText([
      'Name',
      'Category',
      'Calories',
      'Protein (g)',
      'Total Fat (g)',
      'Sat. Fat (g)',
      'Trans Fat (g)',
      'Poly. Fat (g)',
      'Mono. Fat (g)',
      'Cholesterol (mg)',
      'Sodium (mg)',
      'Total Carbs (g)',
      'Dietary Fiber (g)',
      'Sugars (g)',
    ]);

    const rows = page.locator('tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
    expect(rowCount).toBeLessThanOrEqual(20);

    const pagination = page.locator('nav[aria-label="Pagination"]');
    if (await pagination.count()) {
      await expect(
        pagination.getByRole('link', { name: '1', exact: true }),
      ).toHaveAttribute('aria-current', 'page');
    }
  });

  test('filters ingredients by category and reflects it in table rows', async ({ page }) => {
    await pickSelectOption(page, getSelectTrigger(page, 'category'), 'Vegetable');
    await page.waitForURL(/category=vegetable/i);

    const categories = await page
      .locator('tbody [data-column="category"]')
      .allTextContents();

    expect(categories.length).toBeGreaterThan(0);
    for (const category of categories) {
      expect(category.trim().toLowerCase()).toBe('vegetable');
    }
  });

  test('sorts ingredients by calories in descending order', async ({ page }) => {
    await pickSelectOption(page, getSelectTrigger(page, 'sort'), 'Calories');
    await page.waitForURL(/sort=calories/i, { timeout: 15_000 });

    await pickSelectOption(page, getSelectTrigger(page, 'order'), 'Desc');
    await page.waitForURL(/order=desc/i, { timeout: 15_000 });

    const calories = await getNumericColumnValues(page, 'calories');
    expect(calories.length).toBeGreaterThan(1);

    const sorted = [...calories].sort((a, b) => b - a);
    expect(calories).toEqual(sorted);
  });
});


import { test, expect, type Page } from '@playwright/test';
import { PLAYWRIGHT_TEST_USER_DEFAULTS } from '../src/constants/test-user';

type RecipeScenario = {
  slug: string;
  title: string;
  createdText: string;
  introMatcher: RegExp;
};

const RECIPES_TO_VERIFY: RecipeScenario[] = [
  {
    slug: 'beef-bolognese',
    title: 'Beef Bolognese',
    createdText: '2025-03-15',
    introMatcher: /classic italian pasta sauce/i,
  },
  {
    slug: 'apple-walnut-salad',
    title: 'Apple and Walnut Salad',
    createdText: '2024-11-10',
    introMatcher: /light and refreshing dish/i,
  },
];

const TEST_USER_EMAIL =
  process.env.PLAYWRIGHT_TEST_USER_EMAIL ?? PLAYWRIGHT_TEST_USER_DEFAULTS.email;

const interceptIncrementViews = async (page: Page) => {
  await page.route('**/api/increment-views', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    });
  });
};

test.describe('Recipe details – public experience', () => {
  test.beforeEach(async ({ page }) => {
    await interceptIncrementViews(page);
  });

  for (const recipe of RECIPES_TO_VERIFY) {
    test(`renders structured content for ${recipe.title}`, async ({ page }) => {
      await page.goto(`/recipes/${recipe.slug}`);

      await expect(page.getByRole('img', { name: recipe.title })).toBeVisible();
      await expect(
        page.getByText(new RegExp(`Created on:\\s+${recipe.createdText}`)),
      ).toBeVisible();
      await expect(page.getByRole('heading', { level: 1, name: recipe.title })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'Introduction' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'Ingredients' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: /Step-by-Step Cooking Guide/i })).toBeVisible();

      await expect(page.getByText(recipe.introMatcher)).toBeVisible();
      await expect(page.locator('table').filter({ hasText: /Nutrient/i })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: /Comments/i })).toBeVisible();
    });
  }

  test('hides gated interactions for anonymous visitors', async ({ page }) => {
    await page.goto(`/recipes/${RECIPES_TO_VERIFY[0].slug}`);

    await expect(page.getByRole('button', { name: /Add to favorites/i })).toHaveCount(0);
    await expect(page.getByText(/Rate this recipe:/i)).toHaveCount(0);
    await expect(page.getByRole('button', { name: /Submit Comment/i })).toHaveCount(0);

  });
});

test.describe('Recipe details – authenticated interactions', () => {
  test.use({
    extraHTTPHeaders: {
      'x-playwright-user-email': TEST_USER_EMAIL,
    },
  });

  test.beforeEach(async ({ page }) => {
    await interceptIncrementViews(page);
  });

  const authenticatedSlug = RECIPES_TO_VERIFY[0].slug;

  test('allows toggling favorites with optimistic UI feedback', async ({ page }) => {
    await page.route('**/api/recipe/like', async (route) => {
      const payload = route.request().postDataJSON();
      expect(payload).toMatchObject({ recipeSlug: authenticatedSlug });

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto(`/recipes/${authenticatedSlug}`);

    const favoriteButton = page.getByRole('button', { name: /Add to favorites/i });
    await expect(favoriteButton).toBeVisible();

    await favoriteButton.click();
    await expect(favoriteButton).toHaveClass(/text-red-500/);
  });

  test('submits a star rating and persists the new value', async ({ page }) => {
    const targetRating = 4;

    await page.route('**/api/recipe/rate', async (route) => {
      const payload = route.request().postDataJSON();
      expect(payload).toMatchObject({ recipeSlug: authenticatedSlug, rating: targetRating });

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto(`/recipes/${authenticatedSlug}`);

    const starButton = page.locator(`button[data-rating="${targetRating}"]`).first();
    await expect(starButton).toBeVisible();

    await starButton.click();
    await expect(starButton.locator('svg').first()).toHaveAttribute('fill', 'currentColor');
  });

  test('allows commenting and refreshes the thread with the new entry', async ({ page }) => {
    const newComment = `Playwright says hello ${Date.now()}`;

    await page.route('**/api/comments/create', async (route) => {
      const payload = route.request().postDataJSON();
      expect(payload).toMatchObject({ recipeSlug: authenticatedSlug, commentText: newComment });

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'playwright-comment',
          commentText: newComment,
          createdAt: new Date().toISOString(),
          user: { id: 'playwright-user', name: PLAYWRIGHT_TEST_USER_DEFAULTS.name, avatar: null },
        }),
      });
    });

    await page.route('**/api/comments?**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'playwright-comment',
            commentText: newComment,
            createdAt: new Date().toISOString(),
            user: { id: 'playwright-user', name: PLAYWRIGHT_TEST_USER_DEFAULTS.name, avatar: null },
          },
        ]),
      });
    });

    await page.goto(`/recipes/${authenticatedSlug}`);

    const commentInput = page.getByPlaceholder('Leave a comment...');
    await expect(commentInput).toBeVisible();

    await commentInput.fill(newComment);

    const creationResponse = page.waitForResponse(
      (response) =>
        response.url().includes('/api/comments/create') && response.request().method() === 'POST',
    );
    const refreshResponse = page.waitForResponse(
      (response) => response.url().includes('/api/comments?') && response.request().method() === 'GET',
    );

    await page.getByRole('button', { name: /Submit Comment/i }).click();
    await Promise.all([creationResponse, refreshResponse]);

    await expect(page.getByText(newComment)).toBeVisible();
  });
});

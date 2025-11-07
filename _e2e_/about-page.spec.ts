import { test, expect } from '@playwright/test';

test.describe('About page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('renders hero introduction with supporting media', async ({ page }) => {
    await expect(page).toHaveTitle(/About Cooking Spot/i);

    const heroHeading = page.getByRole('heading', { level: 1, name: 'Welcome to Cooking Spot' });
    await expect(heroHeading).toBeVisible();

    await expect(
      page.getByText('Cooking Spot is your AI-powered cooking companion', { exact: false }),
    ).toBeVisible();

    const heroImage = page.getByRole('img', {
      name: /vibrant kitchen scene with fresh ingredients/i,
    });
    await expect(heroImage).toBeVisible();
  });

  test('explains why users should choose Cooking Spot with feature cards', async ({ page }) => {
    const sectionHeading = page.getByRole('heading', { level: 2, name: 'Why Choose Cooking Spot?' });
    await expect(sectionHeading).toBeVisible();

    const cards = page.locator('div.card').filter({
      has: page.getByRole('heading', { level: 3 }),
    });
    await expect(cards).toHaveCount(6); // three cards in this section plus three later in the page

    const whyChooseCards = sectionHeading.locator('..').locator('div.card');
    await expect(whyChooseCards).toHaveCount(3);

    const cardTitles = ['AI-Generated Recipes', 'Rate & Comment', 'Personalized Recommendations'];
    for (const title of cardTitles) {
      await expect(page.getByRole('heading', { level: 3, name: title })).toBeVisible();
    }

    const recipeCollectionImage = page.getByRole('img', {
      name: /diverse collection of recipes displayed on a table/i,
    });
    await expect(recipeCollectionImage).toBeVisible();
  });

  test('details standout features and future vision items', async ({ page }) => {
    const featuresHeading = page.getByRole('heading', {
      level: 2,
      name: 'Features That Make Cooking Spot Stand Out',
    });
    await expect(featuresHeading).toBeVisible();

    const featuresSection = featuresHeading.locator('..').locator('ul');
    const featuresListItems = featuresSection.locator('li');
    await expect(featuresListItems).toHaveCount(4);

    const featureHighlights = [
      /AI-Powered Recipes/i,
      /Community Interaction/i,
      /Personalized Experience/i,
      /Future Plans/i,
    ];

    for (const highlight of featureHighlights) {
      await expect(featuresListItems.filter({ hasText: highlight })).toHaveCount(1);
    }

    await expect(
      page.getByRole('img', {
        name: /professional chef preparing a meal/i,
      }),
    ).toBeVisible();

    const visionHeading = page.getByRole('heading', { level: 2, name: 'Our Vision for the Future' });
    await expect(visionHeading).toBeVisible();

    const visionCards = visionHeading.locator('..').locator('div.card');
    await expect(visionCards).toHaveCount(3);

    const visionTitles = ['AI Meal Planning', 'Interactive Cooking Assistant', 'Community Challenges'];
    for (const title of visionTitles) {
      await expect(page.getByRole('heading', { level: 3, name: title })).toBeVisible();
    }
  });

  test('encourages users to join the community with a clear CTA', async ({ page }) => {
    const joinHeading = page.getByRole('heading', { level: 2, name: 'Join the Cooking Spot Community' });
    await expect(joinHeading).toBeVisible();

    const joinSection = joinHeading.locator('..');
    await expect(
      joinSection.getByText('Sign up today and start your culinary journey with us!', { exact: false }),
    ).toBeVisible();

    const ctaLink = joinSection.getByRole('link', { name: 'Sign up today' });
    await expect(ctaLink).toBeVisible();
    await expect(ctaLink).toHaveAttribute('href', '#');

    const closingImage = page.getByRole('img', {
      name: /happy family cooking together/i,
    });
    await expect(closingImage).toBeVisible();
  });
});

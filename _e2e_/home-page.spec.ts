import { test, expect } from '@playwright/test';

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays hero content and primary navigation', async ({ page }) => {
    await expect(page).toHaveTitle(/Cooking Spot/i);

    await expect(
      page.getByRole('heading', { level: 1, name: 'Discover Delicious Recipes' }),
    ).toBeVisible();

    await expect(
      page.getByText('Explore a world of culinary delights', { exact: false }),
    ).toBeVisible();

    const header = page.locator('header');
    const navLinks = ['Recipes', 'About', 'Ingredients', 'Contact'];

    for (const linkText of navLinks) {
      await expect(header.getByRole('link', { name: linkText, exact: false })).toBeVisible();
    }

    const ctaLink = page.getByRole('link', { name: 'Get Started' });
    await expect(ctaLink).toBeVisible();
    await expect(ctaLink).toHaveAttribute('href', '/recipes');

    const learnMoreLink = page.getByRole('link', { name: /Learn more/i });
    await expect(learnMoreLink).toHaveAttribute('href', '/about');

    await page.waitForFunction(() => {
      const loader = document.getElementById('user-data-loader');
      return loader ? getComputedStyle(loader).display === 'none' : false;
    });

    await expect(page.locator('#user-data-loader')).toBeHidden();

    await expect(page.getByRole('button', { name: /google icon/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /facebook icon/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /github icon/i })).toBeVisible();
  });

  test('renders featured recipes section with populated cards', async ({ page }) => {
    const featuredHeading = page.getByRole('heading', { level: 2, name: 'Featured Recipes' });
    await expect(featuredHeading).toBeVisible();

    const cards = page.locator('div.card');
    await expect(cards).toHaveCount(4, { timeout: 15_000 });

    const firstCard = cards.first();
    const primaryImage = firstCard.locator('img[alt]').first();
    await expect(primaryImage).toBeVisible();
    await expect(firstCard.getByRole('heading', { level: 2 })).toBeVisible();
    await expect(firstCard.getByText(/Cook time:/i)).toBeVisible();
    await expect(firstCard.getByText(/Rates/i)).toBeVisible();

    const firstCardLink = firstCard.getByRole('link').first();
    await expect(firstCardLink).toHaveAttribute('href', /\/recipes\//);
  });

  test('allows newsletter subscription after react hydration', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 2, name: 'Stay Updated' })).toBeVisible();
    await expect(
      page.getByText('Subscribe to our newsletter for the latest recipes and cooking tips.', {
        exact: false,
      }),
    ).toBeVisible();

    await page.waitForFunction(() => {
      const loader = document.getElementById('subscribe-form-loader');
      return loader ? getComputedStyle(loader).display === 'none' : false;
    });

    await expect(page.locator('#subscribe-form-loader')).toBeHidden();

    await page.route('**/api/subscribe', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page
      .getByPlaceholder('Enter your email')
      .fill(`cookbook-e2e+${Date.now()}@example.com`);

    const [response] = await Promise.all([
      page.waitForResponse(
        (res) => res.url().includes('/api/subscribe') && res.request().method() === 'POST',
      ),
      page.getByRole('button', { name: 'Subscribe' }).click(),
    ]);

    expect(response.ok()).toBeTruthy();

    await expect(page.getByText('Successfully subscribed!', { exact: false })).toBeVisible();
  });

  test('exposes key footer navigation', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByRole('heading', { name: 'Quick Links' })).toBeVisible();
    await expect(footer.getByRole('heading', { name: 'Recipe Categories' })).toBeVisible();
    await expect(footer.getByRole('heading', { name: 'Connect With Us' })).toBeVisible();

    const policyLinks = [
      { name: /Privacy Policy/i, href: '/privacy-policy' },
      { name: /Terms of Service/i, href: '/terms-of-service' },
      { name: /Sitemap/i, href: '/sitemap-index.xml' },
    ];

    for (const { name, href } of policyLinks) {
      const link = footer.getByRole('link', { name });
      await expect(link).toBeVisible();
      const attribute = await link.getAttribute('href');
      expect(attribute).not.toBeNull();
      expect(attribute?.trim()).toMatch(new RegExp(`${escapeRegex(href)}$`));
    }

    const socialLinks = [
      'https://facebook.com',
      'https://instagram.com',
      'https://twitter.com',
      'https://youtube.com',
    ];

    for (const href of socialLinks) {
      await expect(footer.locator(`a[href="${href}"]`)).toBeVisible();
    }
  });
});

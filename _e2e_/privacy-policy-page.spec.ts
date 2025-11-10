import { test, expect } from '@playwright/test';

test.describe('Privacy Policy page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/privacy-policy');
  });

  test('shows the hero content and introduction copy', async ({ page }) => {
    await expect(page).toHaveTitle(/Privacy Policy/i);

    const heroHeading = page.getByRole('heading', { level: 1, name: 'Privacy Policy' });
    await expect(heroHeading).toBeVisible();

    await expect(page.getByText('Last updated: March 12, 2025')).toBeVisible();

    const introductionHeading = page.getByRole('heading', { level: 2, name: 'Introduction' });
    await expect(introductionHeading).toBeVisible();
    await expect(
      page.getByText('We respect your privacy and are committed to protecting your personal data', {
        exact: false,
      }),
    ).toBeVisible();
  });

  test('details what data is collected and how it is used', async ({ page }) => {
    const infoHeading = page.getByRole('heading', { level: 2, name: 'Information We Collect' });
    await expect(infoHeading).toBeVisible();

    const infoListItems = infoHeading.locator('..').locator('li');
    await expect(infoListItems).toHaveCount(5);

    const infoHighlights = [
      /Identity Data/i,
      /Contact Data/i,
      /Technical Data/i,
      /Usage Data/i,
      /Profile Data/i,
    ];

    for (const highlight of infoHighlights) {
      await expect(infoListItems.filter({ hasText: highlight })).toHaveCount(1);
    }

    const usageHeading = page.getByRole('heading', { level: 2, name: 'How We Use Your Information' });
    await expect(usageHeading).toBeVisible();

    const usageListItems = usageHeading.locator('..').locator('li');
    await expect(usageListItems).toHaveCount(6);

    const cookiesHeading = page.getByRole('heading', { level: 2, name: 'Cookies' });
    await expect(cookiesHeading).toBeVisible();
    await expect(
      page.getByText('We use cookies and similar tracking technologies', { exact: false }),
    ).toBeVisible();
  });

  test('outlines user rights, safeguards, and contact options', async ({ page }) => {
    const securityHeading = page.getByRole('heading', { level: 2, name: 'Data Security' });
    await expect(securityHeading).toBeVisible();
    await expect(
      page.getByText('We have implemented appropriate security measures', { exact: false }),
    ).toBeVisible();

    const rightsHeading = page.getByRole('heading', {
      level: 2,
      name: 'Your Data Protection Rights',
    });
    await expect(rightsHeading).toBeVisible();

    const rightsListItems = rightsHeading.locator('..').locator('li');
    await expect(rightsListItems).toHaveCount(7);

    const childrenHeading = page.getByRole('heading', { level: 2, name: "Children's Privacy" });
    await expect(childrenHeading).toBeVisible();

    const contactHeading = page.getByRole('heading', { level: 2, name: 'Contact Us' });
    await expect(contactHeading).toBeVisible();

    await expect(page.getByText('privacy@cookingspot.com')).toBeVisible();

    const contactLink = page.getByRole('link', { name: 'Contact Us' });
    await expect(contactLink).toHaveAttribute('href', '/contact');
  });
});


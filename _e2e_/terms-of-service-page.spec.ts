import { test, expect } from '@playwright/test';

test.describe('Terms of Service page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/terms-of-service');
  });

  test('shows hero heading and metadata', async ({ page }) => {
    await expect(page).toHaveTitle(/Terms of Service/i);

    const heroHeading = page.getByRole('heading', { level: 1, name: 'Terms of Service' });
    await expect(heroHeading).toBeVisible();
    await expect(page.getByText('Last updated: March 12, 2025')).toBeVisible();

    await expect(
      page.getByText('Please read these terms of service carefully before using Cooking Spot', {
        exact: false,
      }),
    ).toBeVisible();
  });

  test('details introductory sections for acceptance, accounts, and content', async ({ page }) => {
    const acceptanceHeading = page.getByRole('heading', { level: 2, name: /1\. Acceptance of Terms/ });
    await expect(acceptanceHeading).toBeVisible();
    await expect(
      page.getByText('By accessing or using our website, you agree to be bound by these Terms', {
        exact: false,
      }),
    ).toBeVisible();

    const accountsHeading = page.getByRole('heading', { level: 2, name: /2\. User Accounts/ });
    await expect(accountsHeading).toBeVisible();
    await expect(
      page.getByText('You are responsible for safeguarding the password that you use', { exact: false }),
    ).toBeVisible();

    const contentHeading = page.getByRole('heading', { level: 2, name: /3\. User Content/ });
    await expect(contentHeading).toBeVisible();

    const userContentList = contentHeading
      .locator('..')
      .getByTestId('user-content-highlights')
      .locator('li');
    await expect(userContentList).toHaveCount(3);

    const userContentHighlights = [
      /The User Content is yours/i,
      /does not violate the\s+privacy rights/i,
      /does not contain any material that is defamatory/i,
    ];
    for (const highlight of userContentHighlights) {
      await expect(userContentList.filter({ hasText: highlight })).toHaveCount(1);
    }
  });

  test('covers intellectual property, recipe usage, and prohibited uses', async ({ page }) => {
    const ipHeading = page.getByRole('heading', { level: 2, name: /4\. Intellectual Property/ });
    await expect(ipHeading).toBeVisible();
    await expect(
      page.getByText('The website and its original content, features, and functionality are', {
        exact: false,
      }),
    ).toBeVisible();

    const recipeHeading = page.getByRole('heading', { level: 2, name: /5\. Recipe Usage/ });
    await expect(recipeHeading).toBeVisible();
    await expect(
      page.getByText('Recipes shared on Cooking Spot are for personal, non-commercial use only', {
        exact: false,
      }),
    ).toBeVisible();

    const prohibitedHeading = page.getByRole('heading', { level: 2, name: /6\. Prohibited Uses/ });
    await expect(prohibitedHeading).toBeVisible();

    const prohibitedLists = prohibitedHeading.locator('..').locator('ul');
    await expect(prohibitedLists).toHaveCount(2);

    const firstListItems = prohibitedLists.nth(0).locator('li');
    await expect(firstListItems).toHaveCount(4);
    const secondListItems = prohibitedLists.nth(1).locator('li');
    await expect(secondListItems).toHaveCount(4);

    await expect(
      firstListItems.filter({ hasText: /violates any applicable federal/i }),
    ).toHaveCount(1);
    await expect(
      secondListItems.filter({ hasText: /Use any robot, spider/i }),
    ).toHaveCount(1);
  });

  test('explains warranties, liability, and governing rules', async ({ page }) => {
    const warrantyHeading = page.getByRole('heading', { level: 2, name: /7\. Disclaimer of Warranties/ });
    await expect(warrantyHeading).toBeVisible();
    await expect(
      page.getByText('The website and its content are provided on an "AS IS" and "AS AVAILABLE" basis', {
        exact: false,
      }),
    ).toBeVisible();

    const liabilityHeading = page.getByRole('heading', { level: 2, name: /8\. Limitation of Liability/ });
    await expect(liabilityHeading).toBeVisible();

    const liabilityListItems = liabilityHeading.locator('..').locator('li');
    await expect(liabilityListItems).toHaveCount(4);
    await expect(
      liabilityListItems.filter({ hasText: /Any conduct or content of any third party/ }),
    ).toHaveCount(1);

    const indemnityHeading = page.getByRole('heading', { level: 2, name: /9\. Indemnification/ });
    await expect(indemnityHeading).toBeVisible();

    const governingHeading = page.getByRole('heading', { level: 2, name: /10\. Governing Law/ });
    await expect(governingHeading).toBeVisible();
    await expect(
      page.getByText('These Terms shall be governed and construed in accordance with the laws of the United States', {
        exact: false,
      }),
    ).toBeVisible();
  });

  test('communicates change policy and contact options', async ({ page }) => {
    const changesHeading = page.getByRole('heading', { level: 2, name: /11\. Changes to Terms/ });
    await expect(changesHeading).toBeVisible();
    await expect(
      page.getByText('We reserve the right, at our sole discretion, to modify or replace these Terms at any time', {
        exact: false,
      }),
    ).toBeVisible();

    const contactHeading = page.getByRole('heading', { level: 2, name: /12\. Contact Us/ });
    await expect(contactHeading).toBeVisible();
    await expect(page.getByText('legal@cookingspot.com')).toBeVisible();

    const contactLink = page.getByRole('link', { name: 'Contact Us' });
    await expect(contactLink).toHaveAttribute('href', '/contact');
  });
});

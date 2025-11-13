import { expect, test, type Page } from '@playwright/test';
import { HEADER_LINKS } from '../src/constants/config';

const DESKTOP_NAV_SELECTOR = 'header nav .md\\:flex';

const expectActiveDesktopLink = async (page: Page, activeText: string) => {
  const desktopNav = page.locator(DESKTOP_NAV_SELECTOR);
  const activeLink = desktopNav.getByRole('link', { name: activeText, exact: true });
  await expect(activeLink).toHaveAttribute('class', /bg-muted\/30/);

  for (const { text } of HEADER_LINKS) {
    if (text === activeText) continue;
    const inactiveLink = desktopNav.getByRole('link', { name: text, exact: true });
    await expect(inactiveLink).not.toHaveAttribute('class', /bg-muted\/30/);
  }
};

test.describe('Header navigation', () => {
  test('navigates between primary sections via desktop header links', async ({ page }) => {
    await page.goto('/');

    const desktopNav = page.locator(DESKTOP_NAV_SELECTOR);

    await Promise.all([
      page.waitForURL('**/recipes'),
      desktopNav.getByRole('link', { name: 'Recipes', exact: true }).click(),
    ]);
    await expect(page.getByRole('heading', { level: 1, name: 'All Recipes' })).toBeVisible();
    await expectActiveDesktopLink(page, 'Recipes');

    await Promise.all([
      page.waitForURL('**/about'),
      desktopNav.getByRole('link', { name: 'About', exact: true }).click(),
    ]);
    await expect(page.getByRole('heading', { level: 1, name: 'Welcome to Cooking Spot' })).toBeVisible();
    await expectActiveDesktopLink(page, 'About');
  });

  for (const { href, text } of HEADER_LINKS) {
    test(`highlights the "${text}" link when visiting ${href}`, async ({ page }) => {
      await page.goto(href);
      await expectActiveDesktopLink(page, text);
    });
  }
});

test.describe('Mobile navigation menu', () => {
  test.use({ viewport: { width: 414, height: 896 } });

  test('toggles menu visibility and icon rotation state', async ({ page }) => {
    await page.goto('/');

    const menuButton = page.locator('#mobile-menu-button');
    const menu = page.locator('#mobile-menu');
    const icon = page.locator('#mobile-menu-button-icon');

    await expect(menu).toBeHidden();
    await expect(icon).not.toHaveClass(/rotate-180/);

    await menuButton.click();
    await expect(menu).toBeVisible();
    await expect(icon).toHaveClass(/rotate-180/);

    await menuButton.click();
    await expect(menu).toBeHidden();
    await expect(icon).not.toHaveClass(/rotate-180/);
  });

  test('navigates to sections through the mobile-only dropdown', async ({ page }) => {
    await page.goto('/');

    const menuButton = page.locator('#mobile-menu-button');
    await menuButton.click();

    const ingredientsLink = page.locator('#mobile-menu').getByRole('link', {
      name: 'Ingredients',
      exact: true,
    });

    await Promise.all([
      page.waitForURL('**/ingredients'),
      ingredientsLink.click(),
    ]);

    await expect(page.getByRole('heading', { level: 1, name: /Ingredients Nutritional Facts/i })).toBeVisible();
    await expect(page.locator('#mobile-menu')).toBeHidden();
  });
});

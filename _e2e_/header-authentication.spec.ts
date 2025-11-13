import { test, expect, type Page } from '@playwright/test';
import { OAUTH_PROVIDERS } from '../src/constants/config';
import { PLAYWRIGHT_TEST_USER_DEFAULTS } from '../src/constants/test-user';

const TEST_USER_EMAIL =
  process.env.PLAYWRIGHT_TEST_USER_EMAIL ?? PLAYWRIGHT_TEST_USER_DEFAULTS.email;

const waitForAuthLoaderToHide = async (page: Page) => {
  await page.waitForFunction(() => {
    const loader = document.getElementById('user-data-loader');
    return loader ? getComputedStyle(loader).display === 'none' : false;
  });
};

test.describe('Header authentication controls', () => {
  test('renders OAuth provider buttons for guests after hydration', async ({ page }) => {
    await page.goto('/');
    await waitForAuthLoaderToHide(page);

    for (const { provider } of OAUTH_PROVIDERS) {
      await expect(
        page.getByRole('button', {
          name: new RegExp(`${provider}\\s*icon`, 'i'),
        }),
      ).toBeVisible();
    }
  });

  test.describe('authenticated state', () => {
    test.use({
      extraHTTPHeaders: {
        'x-playwright-user-email': TEST_USER_EMAIL,
      },
    });

    test('allows opening the account menu and navigating to the dashboard', async ({ page }) => {
      await page.goto('/');
      await waitForAuthLoaderToHide(page);

      const popoverTrigger = page.locator('[data-slot="popover-trigger"]');
      await expect(popoverTrigger).toBeVisible();
      await popoverTrigger.click();

      const profileItem = page.getByRole('listitem', { name: 'My profile' });
      await expect(profileItem).toBeVisible();
      await expect(page.getByRole('listitem', { name: 'Log out' })).toBeVisible();

      await Promise.all([page.waitForURL('**/my-profile'), profileItem.click()]);
      await expect(page.getByRole('heading', { level: 1, name: 'User Dashboard' })).toBeVisible();
    });
  });
});

import { expect, test, type Page } from '@playwright/test';
import { PLAYWRIGHT_TEST_USER_DEFAULTS } from '../src/constants/test-user';

const TEST_USER_EMAIL =
  process.env.PLAYWRIGHT_TEST_USER_EMAIL ?? PLAYWRIGHT_TEST_USER_DEFAULTS.email;
const TEST_USER_NAME =
  process.env.PLAYWRIGHT_TEST_USER_NAME ?? PLAYWRIGHT_TEST_USER_DEFAULTS.name;
const TEST_USER_BIO =
  process.env.PLAYWRIGHT_TEST_USER_BIO ?? PLAYWRIGHT_TEST_USER_DEFAULTS.bio;

const mockImageKitAuth = async (page: Page) => {
  await page.route('**/api/image-kit/auth', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        signature: 'playwright-signature',
        token: 'playwright-token',
        expire: Math.floor(Date.now() / 1000) + 120,
      }),
    });
  });
};

const mockImageKitUpload = async (
  page: Page,
  filePath: string,
  onRequest?: () => void,
) => {
  await page.route('**/api/v1/files/upload', async (route) => {
    onRequest?.();
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        filePath,
        url: `https://ik.imagekit.io/mock${filePath}`,
        name: 'playwright-avatar.png',
      }),
    });
  });
};

const stubReloadCounter = async (page: Page) => {
  await page.addInitScript(() => {
    window.location.reload = () => {
      return;
    };
  });
};

test.use({
  extraHTTPHeaders: {
    'x-playwright-user-email': TEST_USER_EMAIL,
  },
});

test.describe('My Profile page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/my-profile');
  });

  test('renders the dashboard hero, profile card, and avatar controls', async ({ page }) => {
    await expect(page).toHaveTitle(/User Dashboard/i);

    await expect(page.getByRole('heading', { level: 1, name: 'User Dashboard' })).toBeVisible();
    await expect(page.getByText(TEST_USER_NAME)).toBeVisible();
    await expect(page.getByText(TEST_USER_EMAIL)).toBeVisible();

    await expect(page.getByRole('heading', { level: 3, name: 'Bio' })).toBeVisible();
    await expect(page.getByText(TEST_USER_BIO, { exact: true })).toBeVisible();

    await expect(page.getByRole('button', { name: /^Upload$/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Submit$/i })).toBeDisabled();
    await expect(page.getByRole('button', { name: /^Edit Bio$/i })).toBeVisible();
  });

  test('allows editing and saving bio content', async ({ page }) => {
    const updatedBio = `Playwright updated bio ${Date.now()}`;

    await page.route('**/api/user', async (route) => {
      const payload = route.request().postDataJSON();
      expect(payload).toMatchObject({ bio: updatedBio });

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ...payload }),
      });
    });

    await page.getByRole('button', { name: /^Edit Bio$/i }).click();
    const editor = page.locator('textarea');
    await editor.fill(updatedBio);

    await Promise.all([
      page.waitForResponse((response) => response.url().includes('/api/user') && response.ok()),
      page.getByRole('button', { name: /^Save$/i }).click(),
    ]);

    await expect(page.getByRole('button', { name: /^Edit Bio$/i })).toBeVisible();
    await expect(page.getByText(updatedBio, { exact: true })).toBeVisible();
  });

  test('shows empty state messaging and CTAs for favorites and rated sections', async ({ page }) => {
    const favoriteSection = page
      .locator('section')
      .filter({ has: page.getByRole('heading', { level: 2, name: 'Favorite Recipes' }) });

    await expect(
      favoriteSection.getByText("You don't have any favorite recipes yet.", { exact: false }),
    ).toBeVisible();
    await expect(
      favoriteSection.getByRole('link', { name: "Let's change it!" }),
    ).toHaveAttribute('href', '/recipes');
    await expect(favoriteSection.getByRole('link', { name: 'See more...' })).toHaveCount(0);

    const ratedSection = page
      .locator('section')
      .filter({ has: page.getByRole('heading', { level: 2, name: 'Rated Recipes' }) });

    await expect(
      ratedSection.getByText("You haven't rated any recipes yet.", { exact: false }),
    ).toBeVisible();
    await expect(
      ratedSection.getByRole('link', { name: "Let's change it!" }),
    ).toHaveAttribute('href', '/recipes');
    await expect(ratedSection.getByRole('link', { name: 'See more...' })).toHaveCount(0);
  });

  test('redirects visitors without auth headers back to home', async ({ browser }) => {
    const context = await browser.newContext({
      extraHTTPHeaders: {},
    });
    const page = await context.newPage();
    const targetUrl = new URL(
      '/my-profile',
      process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4321',
    ).toString();

    await page.goto(targetUrl);
    await expect(page).toHaveURL(new URL('/', targetUrl).toString());
    await context.close();
  });

  test('uploads a new avatar and persists it via the API', async ({ page }) => {
    const uploadedPath = '/cooking-spot/user-avatars/playwright-avatar.png';

    await stubReloadCounter(page);
    await mockImageKitAuth(page);
    let uploadCalls = 0;
    await mockImageKitUpload(page, uploadedPath, () => {
      uploadCalls += 1;
    });

    let avatarPayload: Record<string, unknown> | null = null;
    await page.route('**/api/image-kit/avatar', async (route) => {
      avatarPayload = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, ...avatarPayload }),
      });
    });

    await page.goto('/my-profile');
    await page.evaluate(() => {
      window.location.reload = () => {};
    });

    const uploadButton = page.getByRole('button', { name: /^Upload$/i });
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      uploadButton.click(),
    ]);

    await fileChooser.setFiles({
      name: 'avatar.png',
      mimeType: 'image/png',
      buffer: Buffer.from('playwright-avatar'),
    });

    await page.waitForResponse((response) => response.url().includes('/api/v1/files/upload'));
    await expect.poll(() => uploadCalls).toBe(1);

    const submitButton = page.getByRole('button', { name: /^Submit$/i });
    await expect(submitButton).toBeEnabled();

    const avatarResponse = page.waitForResponse(
      (response) =>
        response.url().includes('/api/image-kit/avatar') && response.request().method() === 'POST',
    );

    await submitButton.click();

    const response = await avatarResponse;
    expect(response.ok()).toBeTruthy();
    expect(avatarPayload).toMatchObject({ avatar: uploadedPath });
    await expect(submitButton).toBeDisabled();
  });

  test('blocks oversized avatar uploads client-side', async ({ page }) => {
    await stubReloadCounter(page);
    await mockImageKitAuth(page);

    let uploadCalled = false;
    await page.route('**/api/v1/files/upload', (route) => {
      uploadCalled = true;
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ filePath: '/should-not-hit' }),
      });
    });

    await page.goto('/my-profile');

    const uploadButton = page.getByRole('button', { name: /^Upload$/i });
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      uploadButton.click(),
    ]);

    await fileChooser.setFiles({
      name: 'too-big.png',
      mimeType: 'image/png',
      buffer: Buffer.alloc(3 * 1024 * 1024),
    });

    await expect(page.getByText('Image size should be less than 2MB').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /^Submit$/i })).toBeDisabled();
    expect(uploadCalled).toBeFalsy();
  });
});

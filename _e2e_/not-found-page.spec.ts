import { expect, test, type Page } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4321';
const HOME_URL = new URL('/', BASE_URL).toString();

const getAbsoluteUrl = (path: string) => new URL(path, BASE_URL).toString();

const waitForDocumentResponse = (page: Page, path: string) =>
  page.waitForResponse(
    (response) =>
      response.url() === getAbsoluteUrl(path) &&
      response.request().resourceType() === 'document',
  );

const visitPathAndCaptureRedirect = async (page: Page, path: string) => {
  const redirectPromise = waitForDocumentResponse(page, path);
  await page.goto(path);
  return redirectPromise;
};

const expectHomeHeroContent = async (page: Page) => {
  await expect(
    page.getByRole('heading', { level: 1, name: 'Discover Delicious Recipes' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Get Started' })).toHaveAttribute('href', '/recipes');
  await expect(page.getByRole('link', { name: /Learn more/i })).toHaveAttribute('href', '/about');
};

test.describe('Not Found handling', () => {
  test('redirects arbitrary unknown routes back to the home hero', async ({ page }) => {
    const redirectResponse = await visitPathAndCaptureRedirect(
      page,
      '/totally-missing-page-for-e2e',
    );

    expect(redirectResponse.status()).toBe(302);

    await expect(page).toHaveURL(HOME_URL);
    await expectHomeHeroContent(page);
  });

  test('redirects the dedicated /404 page without showing fallback messaging', async ({ page }) => {
    const redirectResponse = await visitPathAndCaptureRedirect(page, '/404');

    expect(redirectResponse.status()).toBe(302);

    await expect(page).toHaveURL(HOME_URL);
    await expect(page.getByRole('heading', { level: 2, name: 'Featured Recipes' })).toBeVisible();
    await expect(
      page.getByText("Oops! The page you're looking for doesn't exist.", { exact: false }),
    ).toHaveCount(0);
  });

  test('keeps navigation functional after redirecting from a missing route', async ({ page }) => {
    await visitPathAndCaptureRedirect(page, '/another-imaginary-page');
    await expectHomeHeroContent(page);

    await Promise.all([
      page.waitForURL(new URL('/recipes', BASE_URL).toString()),
      page.getByRole('link', { name: 'Get Started' }).click(),
    ]);

    await expect(page.getByRole('heading', { level: 1, name: 'All Recipes' })).toBeVisible();
  });
});

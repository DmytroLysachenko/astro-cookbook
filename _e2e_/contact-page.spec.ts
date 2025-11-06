import { test, expect, type Page } from '@playwright/test';

const waitForFormHydration = async (page: Page) => {
  await page.waitForFunction(() => {
    const loader = document.getElementById('form-loader');
    return loader ? getComputedStyle(loader).display === 'none' : false;
  });
};

const fillContactForm = async (
  page: Page,
  overrides?: Partial<
    Record<'firstName' | 'lastName' | 'email' | 'subject' | 'message', string>
  >,
) => {
  const defaults = {
    firstName: 'Jamie',
    lastName: 'Oliver',
    email: 'jamie.oliver@example.com',
    subject: 'Curious about your recipes',
    message: 'Really enjoying the cookbook, keep up the great work!',
    ...overrides,
  };

  await page.getByLabel('First Name').fill(defaults.firstName);
  await page.getByLabel('Last Name').fill(defaults.lastName);
  await page.getByLabel('Email').fill(defaults.email);
  await page.getByLabel('Subject').fill(defaults.subject);
  await page.getByLabel('Message').fill(defaults.message);
};

test.describe('Contact page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact-us');
    await waitForFormHydration(page);
  });

  test('validates required fields before submission', async ({ page }) => {
    await page.getByRole('button', { name: 'Send Message' }).click();

    const validationMessages = [
      'First name must be at least 2 characters',
      'Last name must be at least 2 characters',
      'Please enter a valid email address',
      'Subject must be at least 5 characters',
      'Message must be at least 10 characters',
    ];

    for (const message of validationMessages) {
      await expect(page.getByText(message)).toBeVisible();
    }

    await page.getByLabel('First Name').fill('Jo');
    await expect(
      page.getByText('First name must be at least 2 characters'),
    ).toBeHidden();

    await page.getByLabel('Email').fill('invalid-email');
    await expect(
      page.getByText('Please enter a valid email address'),
    ).toBeVisible();

    await fillContactForm(page);
    await expect(
      page.getByText('Please enter a valid email address'),
    ).toBeHidden();
  });

  test('submits contact form successfully', async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await fillContactForm(page);

    const sendButton = page.getByRole('button', { name: /^Send Message$/ });

    const requestPromise = page.waitForRequest(
      (request) =>
        request.url().includes('/api/contact') && request.method() === 'POST',
    );
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes('/api/contact') &&
        response.request().method() === 'POST',
    );

    await sendButton.click();

    const [request, response] = await Promise.all([
      requestPromise,
      responsePromise,
    ]);

    expect(response.ok()).toBeTruthy();

    const payload = JSON.parse(request.postData() ?? '{}');
    expect(payload).toMatchObject({
      firstName: 'Jamie',
      lastName: 'Oliver',
      email: 'jamie.oliver@example.com',
      subject: 'Curious about your recipes',
      message: 'Really enjoying the cookbook, keep up the great work!',
    });

    await expect(
      page.getByText('Message sent!', { exact: false }),
    ).toBeVisible();
    await expect(
      page.getByText('Your message successfully sent!', { exact: false }),
    ).toBeVisible();

    await expect(sendButton).toHaveText(/Send Message/);
    await expect(sendButton).toBeEnabled();
  });
});

import { test, expect } from '@playwright/test';
import { PLAYWRIGHT_TEST_USER_DEFAULTS } from '../src/constants/test-user';

const TEST_USER_EMAIL =
  process.env.PLAYWRIGHT_TEST_USER_EMAIL ?? PLAYWRIGHT_TEST_USER_DEFAULTS.email;

test.describe('Private API authorization', () => {
  test('rejects requests missing the Playwright auth header', async ({ request }) => {
    const response = await request.post('/api/user', {
      data: { bio: 'Playwright tries to update profile' },
    });

    expect(response.status()).toBe(401);
    const payload = await response.json();
    expect(payload).toMatchObject({ error: 'Unauthorized' });
  });

  test('allows test header through and enforces route-level validation', async ({ request }) => {
    const response = await request.post('/api/user', {
      headers: {
        'x-playwright-user-email': TEST_USER_EMAIL,
      },
      data: { name: 'Playwright User' },
    });

    expect(response.status()).toBe(400);
    const payload = await response.json();
    expect(payload).toMatchObject({ error: 'Bad request' });
  });
});

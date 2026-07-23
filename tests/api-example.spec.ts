import { test, expect } from '@playwright/test';

/**
 * Example API test using Playwright's built-in request context.
 * Demonstrates that this portfolio isn't limited to UI automation —
 * clients often want API-level checks too (status codes, response
 * shape, performance thresholds).
 *
 * Uses a free public test API (reqres.in) since SauceDemo has no public API.
 */
test.describe('API smoke checks (example against a public test API)', () => {
  test('GET /users/2 returns expected shape and fields', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/2');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('id', 2);
    expect(body).toHaveProperty('email');
    expect(body.email).toMatch(/@/);
  });

  test('GET /users/999 (nonexistent) returns 404', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/999');
    expect(response.status()).toBe(404);
  });

  test('response time is within an acceptable threshold', async ({ request }) => {
    const start = Date.now();
    const response = await request.get('https://jsonplaceholder.typicode.com/users');
    const durationMs = Date.now() - start;

    expect(response.status()).toBe(200);
    expect(durationMs).toBeLessThan(3000);
  });
});

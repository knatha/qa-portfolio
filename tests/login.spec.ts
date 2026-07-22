import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

/**
 * Login test coverage: standard user, locked-out user, and invalid credentials.
 * SauceDemo exposes several seeded test accounts specifically for this purpose:
 * standard_user, locked_out_user, problem_user, performance_glitch_user, etc.
 * Password for all seeded accounts is: secret_sauce
 */
test.describe('Login', () => {
  test('standard user can log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.expectLoaded();
  });

  test('locked-out user sees an appropriate error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await loginPage.expectErrorContaining('locked out');
  });

  test('invalid password is rejected with an error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'wrong_password');

    await loginPage.expectErrorContaining('Username and password do not match');
  });

  test('empty credentials are rejected', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');

    await loginPage.expectErrorContaining('Username is required');
  });
});

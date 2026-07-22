import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Cart and product sorting', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('adding items updates the cart badge count', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    expect(await inventoryPage.getCartCount()).toBe(0);

    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).toBe(1);

    await inventoryPage.addItemToCartByName('Sauce Labs Bike Light');
    expect(await inventoryPage.getCartCount()).toBe(2);
  });

  // Data-driven test: same assertion logic, different sort options.
  const sortCases: {
    option: 'Price (low to high)' | 'Price (high to low)';
    expectAscending: boolean;
  }[] = [
    { option: 'Price (low to high)', expectAscending: true },
    { option: 'Price (high to low)', expectAscending: false },
  ];

  for (const { option, expectAscending } of sortCases) {
    test(`sorting by "${option}" orders prices correctly`, async ({ page }) => {
      const inventoryPage = new InventoryPage(page);

      await inventoryPage.sortBy(option);
      const prices = await inventoryPage.getAllPrices();
      const sorted = [...prices].sort((a, b) => (expectAscending ? a - b : b - a));

      expect(prices).toEqual(sorted);
    });
  }

  test('cart persists selected item into the cart page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addItemToCartByName('Sauce Labs Fleece Jacket');
    await inventoryPage.goToCart();

    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Fleece Jacket');
  });

  test('checkout flow completes successfully after adding an item to the cart', async ({
    page,
  }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();

    await cartPage.expectItemInCart('Sauce Labs Backpack');
    await cartPage.checkout();

    await checkoutPage.fillShippingInfo('Jane', 'Doe', '90210');
    await checkoutPage.continue();
    await checkoutPage.finish();

    await checkoutPage.expectOrderComplete();
  });
});

import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectItemInCart(name: string) {
    await expect(this.cartItems.locator('.inventory_item_name', { hasText: name })).toBeVisible();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

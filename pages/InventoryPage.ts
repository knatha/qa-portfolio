import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object for the SauceDemo inventory (product listing) page.
 */
export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async addItemToCartByName(name: string) {
    const item = this.page.locator('.inventory_item', { hasText: name });
    await item.getByRole('button', { name: /add to cart/i }).click();
  }

  async getCartCount(): Promise<number> {
    if (await this.cartBadge.count() === 0) return 0;
    return Number(await this.cartBadge.innerText());
  }

  async sortBy(option: 'Name (A to Z)' | 'Name (Z to A)' | 'Price (low to high)' | 'Price (high to low)') {
    await this.sortDropdown.selectOption({ label: option });
  }

  async getAllPrices(): Promise<number[]> {
    const priceLocators = await this.page.locator('.inventory_item_price').allInnerTexts();
    return priceLocators.map((p) => Number(p.replace('$', '')));
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}

const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../../pages/ProductPage');
const { CartPage } = require('../../pages/CartPage');
const testData = require('../../fixtures/test-data.json');

test.describe('MT-003 Cart Updates', () => {
  test('adding a product increments the cart counter and shows the product in cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const { name } = testData.products.default;

    await productPage.openProduct(name);
    const initialCount = await cartPage.getCartCount();

    await productPage.setQuantity(1);
    await productPage.addToCart();

    await expect(cartPage.cartBadge).toHaveText(String(initialCount + 1));

    await cartPage.gotoCart();
    await expect(cartPage.productTitle).toHaveText(new RegExp(name, 'i'));
  });
});
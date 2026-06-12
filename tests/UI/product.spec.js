const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../../pages/ProductPage');
const testData = require('../../fixtures/test-data.json');

test.describe('MT-002 Browse Products', () => {
  test('user can view a product detail page from the home page', async ({ page }) => {
    const productPage = new ProductPage(page);
    const { name, expectedPrice } = testData.products.default;
    await productPage.openProduct(name);

    await expect(productPage.productTitle).toHaveText(new RegExp(name, 'i'));
    await expect(page.getByRole('img', { name: new RegExp(name, 'i') })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    await expect(page.locator(`text=${expectedPrice}`)).toBeVisible();
  });
});
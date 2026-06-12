class ProductPage {
  constructor(page) {
    this.page = page;
    //this.quantityInput = page.getByLabel('Quantity');
    this.quantityInput = page.getByLabel('Quantity', { exact: true });
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.cartLink = page.getByRole('link', { name: /cart/i });
    this.productTitle = page.getByRole('heading', { level: 1 });
  }

  async gotoHome() {
    await this.page.goto('https://practicesoftwaretesting.com');
   // await this.page.waitForLoadState('networkidle');
  }

  async openProduct(name) {
    await this.gotoHome();
    await this.page.getByRole('link', { name: new RegExp(name, 'i') }).first().click();
   // await this.page.waitForLoadState('networkidle');
  }

  async setQuantity(quantity) {
    await this.quantityInput.fill(String(quantity));
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.page.waitForTimeout(1000);
  }

  async openCart() {
    await this.cartLink.click();
   // await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { ProductPage };
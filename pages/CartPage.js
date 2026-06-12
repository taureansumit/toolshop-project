class CartPage {
  constructor(page) {
    this.page = page;
    this.cartBadge = page.locator('#lblCartCount');
    this.cartIcon = page.getByRole('link', { name: /cart/i });
    this.proceedToCheckoutButton = page.getByRole('button', { name: 'Proceed to checkout' });
    this.productTitle = page.getByRole('cell', { name: /Combination Pliers|Pliers|Bolt Cutters|Long Nose Pliers|Slip Joint Pliers|Claw Hammer/i }).first();
  }

  async getCartCount() {
   // const countText = await this.cartBadge.innerText();
    //return Number(countText || '0');

        if (await this.cartBadge.isVisible()) {
        const countText = await this.cartBadge.innerText();
        return Number(countText || '0');
    }
    return 0;
  }

  async gotoCart() {
    await this.cartIcon.click();
   // await this.page.waitForLoadState('networkidle');
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
   // await this.page.waitForLoadState('networkidle');


  }
}

module.exports = { CartPage };
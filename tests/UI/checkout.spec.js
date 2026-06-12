const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { ProductPage } = require('../../pages/ProductPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const testData = require('../../fixtures/test-data.json');

test.describe('MT-004 Checkout Flow', () => {
  test('user can complete the checkout process after logging in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const { email, password } = testData.users.customer;
    const { name } = testData.products.default;
    const shippingAddress = testData.shippingAddresses.default;
    const cardDetails = testData.cards.validVisa;
    const paymentMethod = testData.paymentMethods.creditCard;
    const successMessage = testData.expectedMessages.paymentSuccess;

    await loginPage.login(email, password);
    //adding a line to ensure logged in state.
    await expect(page.getByRole('button', { name: 'John Doe' })).toBeVisible();
    await productPage.openProduct(name);
    await productPage.setQuantity(1);
    await productPage.addToCart();
    await cartPage.gotoCart();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.proceedToCheckout();

    await checkoutPage.fillShipping(shippingAddress);

     await checkoutPage.proceedToCheckout();
    await checkoutPage.selectPaymentMethod(paymentMethod);
    await checkoutPage.fillCardDetails(cardDetails);
    await checkoutPage.confirmOrder();
    await expect(page.getByText(successMessage)).toBeVisible({ timeout: 10000 });
  });
});
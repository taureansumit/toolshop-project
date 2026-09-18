const { test, expect, request } = require('@playwright/test');
const { AuthService } = require('../../services/AuthService');
const { CartService } = require('../../services/CartService');
const { InvoiceService } = require('../../services/InvoiceService');
const testData = require('../../fixtures/test-data.json');

const apiBaseURL = 'https://api.practicesoftwaretesting.com';

test.describe('API-004 Place Order (Create Invoice)', () => {
  test('should create an invoice for a cart with valid billing and payment details', async () => {
    const apiRequest = await request.newContext({ baseURL: apiBaseURL });
    const authService = new AuthService(apiRequest);
    const cartService = new CartService(apiRequest);
    const invoiceService = new InvoiceService(apiRequest);

    // Step 1: Login and capture bearer token
    const loginResponse = await authService.login(
      testData.users.customer.email,
      testData.users.customer.password
    );
    const loginBody = await loginResponse.json();
    const token = loginBody.access_token;

    await expect(loginResponse).toBeOK();
    await expect(token).toBeTruthy();

    // Step 2: Create cart and add item, capturing cart id
    const createCartResponse = await cartService.createCart();
    const createCartBody = await createCartResponse.json();
    const cartId = createCartBody.id;

    await expect(createCartResponse).toBeOK();
    await expect(cartId).toBeTruthy();

    // Get a product to add to cart
    const productsResponse = await apiRequest.get('/products');
    const productsBody = await productsResponse.json();
    const productId = productsBody.data[0].id;

    const addToCartResponse = await cartService.addToCart(cartId, productId, 1);
    await expect(addToCartResponse).toBeOK();

    // Step 3: Call POST /invoices using InvoiceService with bearer token
const invoiceResponse = await invoiceService.createInvoice(
    token,
    cartId,
    testData.billingAddress.default,
    testData.paymentMethods.bankTransfer,
    testData.paymentDetails.bankTransfer
);

    const invoiceBody = await invoiceResponse.json();
    console.log('Invoice response body:', JSON.stringify(invoiceBody, null, 2));

    // Assertions on POST /invoices response
    await expect(invoiceResponse).toBeOK();
    await expect(invoiceBody).toHaveProperty('invoice_number');
   // await expect(invoiceBody).toHaveProperty('status');
    await expect(invoiceBody).toHaveProperty('total');
    await expect(invoiceBody).toHaveProperty('billing_street');
    await expect(invoiceBody).toHaveProperty('billing_city');
    await expect(invoiceBody).toHaveProperty('billing_state');
    await expect(invoiceBody).toHaveProperty('billing_country');
    await expect(invoiceBody).toHaveProperty('billing_postal_code');
  //  await expect(invoiceBody).toHaveProperty('invoicelines');
   // await expect(invoiceBody.payment).toBeDefined();
   // await expect(invoiceBody.payment.payment_method).toBe(testData.paymentMethods.bankTransfer);

    await apiRequest.dispose();
  });
});

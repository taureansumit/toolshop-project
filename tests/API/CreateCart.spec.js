const { test, expect, request } = require('@playwright/test');
const { CartService } = require('../../services/CartService');
const testData = require('../../fixtures/test-data.json');

const apiBaseURL = 'https://api.practicesoftwaretesting.com';

test.describe('API-003 Create Cart', () => {
  test('should create a cart and return cart id for the default product', async () => {
    const apiRequest = await request.newContext({ baseURL: apiBaseURL });
    const cartService = new CartService(apiRequest);

    const createCartResponse = await cartService.createCart();
    const createCartBody = await createCartResponse.json();

 await expect(createCartResponse).toBeOK();
    await expect(createCartBody).toHaveProperty('id');
    await expect(createCartBody.id).toBeTruthy();

    await apiRequest.dispose();
  });
});
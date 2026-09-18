const { test, expect, request } = require('@playwright/test');
const { ProductService } = require('../../services/ProductService');

const apiBaseURL = 'https://api.practicesoftwaretesting.com';

test.describe('API-002 Get Products List', () => {
  test('should retrieve products list with pagination metadata', async () => {
    const apiRequest = await request.newContext({ baseURL: apiBaseURL });
    const productService = new ProductService(apiRequest);

    const response = await productService.getProducts();
    const body = await response.json();

    // Verify response status is 200 OK
    await expect(response).toBeOK();

    // Verify pagination metadata exists
    await expect(body).toHaveProperty('current_page');
    await expect(body).toHaveProperty('data');
    await expect(body).toHaveProperty('from');
    await expect(body).toHaveProperty('last_page');
    await expect(body).toHaveProperty('per_page');
    await expect(body).toHaveProperty('to');
    await expect(body).toHaveProperty('total');

    // Verify data is an array
    await expect(Array.isArray(body.data)).toBeTruthy();

    // Verify each product has required fields
    for (const product of body.data) {
      await expect(product).toHaveProperty('id');
      await expect(product).toHaveProperty('name');
      await expect(product).toHaveProperty('price');
      await expect(product).toHaveProperty('in_stock');
    }

    await apiRequest.dispose();
  });
});

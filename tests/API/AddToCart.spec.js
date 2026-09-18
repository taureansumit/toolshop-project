const { test, expect, request } = require('@playwright/test');
const { ProductService } = require('../../services/ProductService');
const { CartService } = require('../../services/CartService');
const testData = require('../../fixtures/test-data.json');

const apiBaseURL = 'https://api.practicesoftwaretesting.com';

test.describe('API-003 Add Product to Cart', () => {
  test('should add the default product to a newly created cart', async () => {
    const apiRequest = await request.newContext({ baseURL: apiBaseURL });
    const productService = new ProductService(apiRequest);
    const cartService = new CartService(apiRequest);

    const productsResponse = await productService.getProducts();
    const productsBody = await productsResponse.json();
    await expect(productsResponse).toBeOK();

    const product = productsBody.data.find(
      (item) => item.name === testData.products.default.name
    );

    await expect(product).toBeTruthy();
    await expect(product.id).toBeTruthy();

    const createCartResponse = await cartService.createCart();
    const cartBody = await createCartResponse.json();
    await expect(createCartResponse).toBeOK();
    await expect(cartBody.id).toBeTruthy();

    const addResponse = await cartService.addToCart(cartBody.id, product.id, 1);
    const addBody = await addResponse.json();

    await expect(addResponse).toBeOK();
    await expect(addBody).toEqual(
      expect.objectContaining({ result: 'item added or updated' })
    );

    await apiRequest.dispose();
  });
});
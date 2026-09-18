class CartService {
  constructor(request) {
    this.request = request;
  }

  async createCart() {
    return this.request.post('/carts', {
      data: {},
    });
  }

  async addToCart(cartId, productId, quantity = 1) {
    return this.request.post(`/carts/${cartId}`, {
      data: {
        product_id: productId,
        quantity,
      },
    });
  }
}

module.exports = { CartService };
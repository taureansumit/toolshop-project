class ProductService {
  constructor(request) {
    this.request = request;
  }

  async getProducts(page = 1) {
    return this.request.get('/products', {
      params: { page },
    });
  }
}

module.exports = { ProductService };

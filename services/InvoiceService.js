class InvoiceService {
  constructor(request) {
    this.request = request;
  }

  async createInvoice(token, cartId, billingData, paymentMethod, paymentDetails) {
    return this.request.post('/invoices', {
        data: {
            cart_id: cartId,
            ...billingData,
            payment_method: paymentMethod,
            payment_details: paymentDetails,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
}

module.exports = { InvoiceService };

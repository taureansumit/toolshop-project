class CheckoutPage {
  constructor(page) {
    this.page = page;
    //this.countrySelect = page.getByRole('combobox', { name: /Your country/i });
    this.countrySelect = page.getByRole('combobox', { name: /Country/i });
    this.postalCodeInput = page.getByPlaceholder('Your Postcode *');
    this.houseNumberInput = page.getByPlaceholder('e.g. 42 *');
    this.streetInput = page.getByPlaceholder('Your Street *');
    this.cityInput = page.getByPlaceholder('Your City *');
    this.stateInput = page.getByPlaceholder('State *');
   // this.paymentMethodSelect = page.getByRole('combobox', { name: /Choose your payment method/i });
       this.paymentMethodSelect = page.getByRole('combobox', { name: /Payment Method/i }); 
   this.confirmButton = page.getByRole('button', { name: 'Confirm' });
    this.proceedToCheckoutButton = page.getByRole('button', { name: 'Proceed to checkout' });
this.cardNumberInput = page.getByPlaceholder('Credit Card Number');
this.expirationInput = page.getByPlaceholder('Expiration Date');
this.cvvInput = page.getByPlaceholder('CVV');
this.cardHolderInput = page.getByPlaceholder('Card Holder Name');  
}

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/checkout');
   // await this.page.waitForLoadState('networkidle');
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
   // await this.page.waitForLoadState('networkidle');
  }

  async fillShipping(address) {
    await this.countrySelect.selectOption(address.country);
    await this.postalCodeInput.fill(address.postalCode);
    await this.houseNumberInput.fill(address.houseNumber);
    await this.streetInput.fill(address.street);
    await this.cityInput.fill(address.city);
    await this.stateInput.fill(address.state);
  }

  async selectPaymentMethod(methodValue) {
    await this.paymentMethodSelect.selectOption(methodValue);
  }
  async fillCardDetails(card) {
    await this.cardNumberInput.fill(card.number);
    await this.expirationInput.fill(card.expiration);
    await this.cvvInput.fill(card.cvv);
    await this.cardHolderInput.fill(card.holder);
  }
  async confirmOrder() {
    await this.confirmButton.click();
   // await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { CheckoutPage };
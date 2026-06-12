class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('Your email');
    this.passwordInput = page.getByPlaceholder('Your password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/auth/login');
   // await this.page.waitForLoadState('networkidle');
  }


//This code block seemed to be deleted somehow addint it in

async login(email, password) {
    await this.goto();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
}
  async openLoginFromHome() {
    await this.page.goto('https://practicesoftwaretesting.com');
    await this.signInLink.click();
   // await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { LoginPage };
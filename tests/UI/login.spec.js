const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const testData = require('../../fixtures/test-data.json');

test.describe('MT-001 Customer Login', () => {
  test('customer can log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { email, password } = testData.users.customer;
    await loginPage.login(email, password);

   // await expect(page).toHaveURL(/account/);
    await expect(page.getByRole('button', { name: 'John Doe' })).toBeVisible();
  });
});
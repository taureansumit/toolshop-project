const { test, expect, request } = require('@playwright/test');
const { AuthService } = require('../../services/AuthService');

const apiBaseURL = 'https://api.practicesoftwaretesting.com';

test.describe('API-001 Admin Login', () => {
  test('should authenticate admin and return a bearer token', async () => {
    const apiRequest = await request.newContext({ baseURL: apiBaseURL });
    const authService = new AuthService(apiRequest);

    const response = await authService.login('admin@practicesoftwaretesting.com', 'welcome01');
    const body = await response.json();

    await expect(response).toBeOK();
    await expect(body.access_token).toBeTruthy();
    await expect(body.token_type).toBe('bearer');
    await expect(body.expires_in).toBe(300);

    await apiRequest.dispose();
  });
});

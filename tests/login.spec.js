const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

test.describe('Banking login flow', () => {
  test('allows a valid user to log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.open();
    await loginPage.login('demo@bank.com', 'password123');

    await dashboardPage.expectDashboardVisible();
    await dashboardPage.expectTotalBalance('$15,030.50');
  });

  test('rejects invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('wrong@bank.com', 'wrongpass');

    await loginPage.expectLoginError('Invalid username or password');
  });
});

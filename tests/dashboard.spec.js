const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

test.describe('Banking dashboard checks', () => {
  test('shows account balances after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.open();
    await loginPage.login();

    await dashboardPage.expectDashboardVisible();
    await dashboardPage.expectAccountVisible('Checking');
    await dashboardPage.expectAccountVisible('Savings');
    await dashboardPage.expectTotalBalance('$15,030.50');
  });
});

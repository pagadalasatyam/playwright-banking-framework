const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

test.describe('Banking transfer validation', () => {
  test('allows a valid transfer and shows success message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.open();
    await loginPage.login();
    await dashboardPage.expectDashboardVisible();

    await dashboardPage.transfer({
      recipient: 'Jane Doe',
      amount: 100.25,
      fromAccountId: 'CHK-1001',
    });

    await dashboardPage.expectTransferSuccess('Transfer of $100.25 to Jane Doe was successful');
  });

  test('blocks transfer when the account does not have enough funds', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.open();
    await loginPage.login();
    await dashboardPage.expectDashboardVisible();

    await dashboardPage.transfer({
      recipient: 'Jane Doe',
      amount: 50000,
      fromAccountId: 'CHK-1001',
    });

    await dashboardPage.expectTransferError('Insufficient funds for this transfer');
  });
});

const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.dashboard = page.locator('#dashboard');
    this.userName = page.locator('#user-name');
    this.accountList = page.locator('[data-testid="account-list"]');
    this.accountRows = page.locator('[data-testid="account-row"]');
    this.totalBalance = page.locator('#total-balance');
    this.availableCash = page.locator('#available-cash');
    this.fromAccount = page.locator('#from-account');
    this.recipientName = page.locator('#recipient-name');
    this.transferAmount = page.locator('#transfer-amount');
    this.transferButton = page.locator('#transfer-form button[type="submit"]');
    this.transferMessage = page.locator('#transfer-message');
    this.logoutButton = page.locator('#logout-button');
  }

  async expectDashboardVisible() {
    await expect(this.dashboard).toBeVisible();
  }

  async expectTotalBalance(value) {
    await expect(this.totalBalance).toHaveText(value);
  }

  async expectAccountVisible(accountName) {
    await expect(this.accountList).toContainText(accountName);
  }

  async transfer({ recipient, amount, fromAccountId = 'CHK-1001' }) {
    await this.fromAccount.selectOption(fromAccountId);
    await this.recipientName.fill(recipient);
    await this.transferAmount.fill(String(amount));
    await this.transferButton.click();
  }

  async expectTransferSuccess(message) {
    await expect(this.transferMessage).toContainText(message);
  }

  async expectTransferError(message) {
    await expect(this.transferMessage).toContainText(message);
  }

  async logout() {
    await this.logoutButton.click();
  }
}

module.exports = { DashboardPage };

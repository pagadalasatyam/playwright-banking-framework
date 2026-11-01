const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button:has-text("Sign in")');
    this.message = page.locator('#login-message');
  }

  async open() {
    await super.open('/');
  }

  async login(username = 'demo@bank.com', password = 'password123') {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectLoginError(message) {
    await expect(this.message).toContainText(message);
  }
}

module.exports = { LoginPage };

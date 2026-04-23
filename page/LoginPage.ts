import { Page, Locator, expect } from '@playwright/test';
import { fill, click } from '../function/ActionMethods';


export class LoginPage {
  readonly page: Page;

  readonly loginTitle: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly togglePassword: Locator;
  readonly submitButton: Locator;
  readonly error: Locator;
  readonly userMenu: Locator;
  
  constructor(page: Page) {
    this.page = page;

    this.loginTitle = page.getByTestId('login-title');
    this.emailInput = page.getByTestId('login-email-input');
    this.passwordInput = page.getByTestId('login-password-input');
    this.togglePassword = page.getByTestId('toggle-password-visibility');
    this.submitButton = page.getByTestId('login-submit-button');
    this.error = page.getByTestId('login-error');
    this.userMenu = page.getByTestId('user-menu-trigger');
    
  }

  async open() {
    await this.page.goto('/');
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveURL('/');
    await expect(this.page).toHaveTitle('Повнофункціональний фінансовий менеджер');
  }

  async verifyLoginForm() {
    await expect(this.loginTitle).toBeVisible();
    await expect(this.loginTitle).toHaveText('Вхід до системи');
  }

  // -----------------------------
  // Головний метод логіну
  // -----------------------------
  async login(email: string, password: string) {
    await fill(this.page, this.emailInput, email);
    await fill(this.page, this.passwordInput, password);
    await click(this.page, this.submitButton);
  }

  // -----------------------------
  // Перевірка помилки логіну
  // -----------------------------
  async expectError(message: string) {
    await expect(this.error).toBeVisible();
    await expect(this.error).toHaveText(message);
  }

  // -----------------------------
  // Перевірка успішного логіну
  // -----------------------------
  async expectLoggedIn() {
    await expect(this.userMenu).toBeVisible();
  }
}

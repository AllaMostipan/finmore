import {Page, Locator, expect} from '@playwright/test';


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
 
  async fillEmail(email: string) {
    await expect(this.emailInput).toBeVisible();
    await expect(this.emailInput).toBeEnabled();
    await expect(this.emailInput).toHaveAttribute('placeholder', 'your@email.com');
 
    await this.emailInput.fill(email);
    await expect(this.emailInput).toHaveValue(email);
  }
 
  async fillPassword(password: string) {
    await expect(this.passwordInput).toBeVisible();
    await expect(this.passwordInput).toBeEnabled();
    await expect(this.passwordInput).toHaveAttribute('placeholder', 'Введіть пароль');
 
    await this.passwordInput.fill(password);
    await this.togglePassword.click();
 
    await expect(this.passwordInput).toHaveValue(password);
  }
 
  async submit() {
    await expect(this.submitButton).toBeVisible();
    await expect(this.submitButton).toBeEnabled();
 
    await this.submitButton.click();
  }
 
  async verifyLoginSuccess() {
    await expect(this.userMenu).toBeVisible();
  }

  async verifyErrorMessage(){
    await expect(this.error).toBeVisible();
  }
 
  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }
}
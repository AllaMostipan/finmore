import { test } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';
import { users } from '../data/AuthorizationValidData';
import invalidData from '../data/AuthorizationInvalidData.json';

test.describe('Login', () => {
  let loginPage: LoginPage;
  const invalidUser = invalidData.invalidUser;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('Check open login page', async () => {
    await loginPage.verifyPageLoaded();
    await loginPage.verifyLoginForm();
  });

  test('Login as admin with valid credentials', async () => {

    await test.step('Check login page is opened', async () => {
      await loginPage.verifyLoginForm();
    });

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(users.adminUser.email, users.adminUser.password);
    });

    await test.step('Check login is successful', async () => {
      await loginPage.expectLoggedIn();
    });
  });

  test('Check login with invalid data', async () => {

    await test.step('Check login page is opened', async () => {
      await loginPage.verifyLoginForm();
    });

    await test.step('Login with invalid credentials', async () => {
      await loginPage.login(invalidUser.email, invalidUser.password);
    });

    await test.step('Check error message', async () => {
      await loginPage.expectError('Невірний email або пароль');
    });
  });
});

import { test, expect } from '@playwright/test';


test.describe('Login', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Check open login page', async ({ page }) => {

        await expect(page).toHaveURL('/');
        await expect(page).toHaveTitle('Повнофункціональний фінансовий менеджер');
    });

    test('Check Login form with valid credentials', async ({ page }) => {
        await test.step('Check login page is opened', async () => {
            const enterText = page.getByTestId('login-title');
            await expect(enterText).toBeVisible();
            await expect(enterText).toHaveText('Вхід до системи');
        });

        await test.step('Fill email textfield', async () => {
            const emailInput = page.getByTestId('login-email-input');
            await expect(emailInput).toBeVisible();
            await expect(emailInput).toBeEnabled();
            await expect(emailInput).toHaveAttribute('placeholder', 'your@email.com');
            await emailInput.fill('admin@demo.com');
            await expect(emailInput).toHaveValue('admin@demo.com');
        });

        await test.step('Fill password textfield', async () => {
            const passwordInput = page.getByTestId('login-password-input');
            await expect(passwordInput).toBeVisible();
            await expect(passwordInput).toBeEnabled();
            await expect(passwordInput).toHaveAttribute('placeholder', 'Введіть пароль');
            await passwordInput.fill('admin123');
            const eyeIcon = page.getByTestId('toggle-password-visibility');
            await eyeIcon.click();
            await expect(passwordInput).toHaveValue('admin123');
        });

        await test.step('Submit login form', async () => {
            const submitButton = page.getByTestId('login-submit-button');
            await expect(submitButton).toBeVisible();
            await expect(submitButton).toBeEnabled();
            await submitButton.click();
        });

        await test.step('Check login is successful', async () => {
            const userNameDisplay = page.getByTestId('user-menu-trigger')
            await expect(userNameDisplay).toBeVisible();
        });


    })
});

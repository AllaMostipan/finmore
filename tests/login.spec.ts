import { test, expect } from '@playwright/test';

test('Check open login page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle('Повнофункціональний фінансовий менеджер');
});

test('Check Login form with valid credentials', async ({ page }) => {
    await page.goto('/');
    const enterText = page.getByTestId('login-title');
    await expect(enterText).toBeVisible();
    await expect(enterText).toHaveText('Вхід до системи');
    const emailInput = page.getByTestId('login-email-input');
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toBeEnabled();
    await expect(emailInput).toHaveAttribute('placeholder', 'your@email.com');
    await emailInput.fill('admin@demo.com');
    await expect(emailInput).toHaveValue('admin@demo.com');

    const passwordInput = page.getByTestId('login-password-input');
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toBeEnabled();
    await expect(passwordInput).toHaveAttribute('placeholder', 'Введіть пароль');
    await passwordInput.fill('admin123');
    const eyeIcon = page.getByTestId('toggle-password-visibility');
    await eyeIcon.click();
    await expect(passwordInput).toHaveValue('admin123');

    const submitButton = page.getByTestId('login-submit-button');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    const userNameDisplay= page.getByTestId('user-menu-trigger')
    await expect(userNameDisplay).toBeVisible();

});

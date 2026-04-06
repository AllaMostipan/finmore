import { test, expect } from '@playwright/test';

test.describe('Registration Page Tests', () => {
    test.beforeEach(async({ page }) => {
            await page.goto('/');
        });

    test('Check registration with valid values', async ({ page }) => {
        
        const registrationLink = page.getByRole('button', { 'name': 'Зареєструватися' });


        await registrationLink.click();

        //make sure you are in registration page

        const registrationPage = page.getByTestId('register-title');
        await expect(registrationPage).toBeVisible();
        await expect(registrationPage).toHaveText('Реєстрація');
        const form = page.locator('.space-y-4');
        await expect(form).toBeVisible({ timeout: 100 });
        await expect(form).toBeEnabled();


        //fill registration form valid value
        const fullName = page.getByTestId('register-name-input');
        await expect(fullName).toBeVisible();
        await expect(fullName).toBeEnabled();
        await expect(fullName).toHaveAttribute('placeholder', 'Іван Петренко');
        await fullName.fill('Тарас Шевченко');

        const email = page.getByPlaceholder('your@email.com');
        await email.fill('taras.shevchenko@gmail.com');
        const password = page.getByTestId('register-password-input');
        await password.fill('NewPass123');
        const confirmPassword = page.getByTestId('register-confirm-password-input');
        await confirmPassword.fill('NewPass123');

        const currency = page.getByTestId('register-currency-select');
        await currency.click();
        await currency.selectOption('USD');

        const submit = page.getByTestId('register-submit-button');
        await submit.click();
    });
});
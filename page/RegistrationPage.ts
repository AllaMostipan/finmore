import { Page, Locator, expect } from '@playwright/test';
import { selectOption, click, fill } from '../function/ActionMethods';

export class RegistrationPage {
    readonly page: Page;

    readonly registrationLink: Locator;
    readonly pageTitle: Locator;
    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly viewPasswordIcon: Locator;
    readonly confirmPasswordInput: Locator;
    readonly confirmViewPasswordIcon: Locator;
    readonly currencySelect: Locator;
    readonly submitButton: Locator;
    readonly loginLink: Locator;
    readonly userMenu: Locator;

    constructor(page: Page) {
        this.page = page;

        this.registrationLink = page.getByTestId('switch-to-register-button');
        this.pageTitle = page.getByTestId('register-title');
        this.fullNameInput = page.getByTestId('register-name-input');
        this.emailInput = page.getByTestId('register-email-input');
        this.passwordInput = page.getByTestId('register-password-input');
        this.viewPasswordIcon = page.getByTestId('toggle-password-visibility');
        this.confirmPasswordInput = page.getByTestId('register-confirm-password-input');
        this.confirmViewPasswordIcon = page.getByTestId('toggle-confirm-password-visibility');
        this.currencySelect = page.getByTestId('register-currency-select');
        this.submitButton = page.getByTestId('register-submit-button');
        this.loginLink = page.getByTestId('switch-to-login-button');
        this.userMenu = page.getByTestId('user-menu-trigger');

    };


    async openRegistrationPage() {
        await expect(this.registrationLink).toBeVisible();
        await expect(this.registrationLink).toBeEnabled();
        await click(this.page, this.registrationLink);
    };

    async verifyRegistationFormOpened() {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.pageTitle).toHaveText('Реєстрація');
    };

    async fillFullName(fullName: string) {
        await fill(this.page, this.fullNameInput, fullName);
    };

    async fillEmail(email: string) {
        await fill(this.page, this.emailInput, email)
    };

    async fillPassword(password: string) {
        await expect(this.passwordInput).toBeVisible();
        await expect(this.passwordInput).toBeEnabled();
        await expect(this.passwordInput).toHaveAttribute('placeholder', 'Мінімум 6 символів');

        await this.passwordInput.fill(password);

        await expect(this.viewPasswordIcon).toBeVisible();
        await expect(this.viewPasswordIcon).toBeEnabled();
        await this.viewPasswordIcon.click();

        await expect(this.passwordInput).toHaveValue(password);
    };

    async fillConfirmPassword(confirmPassword: string) {
        await expect(this.confirmPasswordInput).toBeVisible();
        await expect(this.confirmPasswordInput).toBeEnabled();
        await expect(this.confirmPasswordInput).toHaveAttribute('placeholder', 'Повторіть пароль');

        await this.confirmPasswordInput.fill(confirmPassword);

        await expect(this.confirmViewPasswordIcon).toBeVisible();
        await expect(this.confirmViewPasswordIcon).toBeEnabled();
        await this.confirmViewPasswordIcon.click();

        await expect(this.confirmPasswordInput).toHaveValue(confirmPassword);
    };

    async selectCurrency(currency: string) {
        await selectOption(this.page, this.currencySelect, currency, {
            strict: true,
            log: true,
        });
    }

    async submit() {
        await click(this.page, this.submitButton);
    }

    async verifyRegistrationSuccess(fullName: string) {
        await expect(this.userMenu).toBeVisible();
        await expect(this.userMenu).toHaveText(fullName);
    }

    async register(fullName: string, email: string, password: string, confirmPassword: string, currency: string) {
        await this.fillFullName(fullName);
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.fillConfirmPassword(confirmPassword);
        await this.selectCurrency(currency);
        await this.submit();
    }



}
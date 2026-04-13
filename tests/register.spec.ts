import { test } from '@playwright/test';
import { RegistrationPage } from '../page/RegistrationPage';
import { generateUser } from '../utils/helperData';

test.describe('Registration Page Tests', () => {
    let registrationPage: RegistrationPage;
    const user = generateUser();


    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        registrationPage = new RegistrationPage(page);
    });

    test('Check registration with valid values', async ({ page }) => {

        await test.step('Check registration page is opened', async () => {
            await registrationPage.openLogin();
            await registrationPage.verifyLoginPageLoaded();
            await registrationPage.openRegistrationPage();
            await registrationPage.verifyRegistationFormOpened();

        });

        await test.step('Register user with valid data', async () => {
            await registrationPage.registrationValidValue(user.fullName, user.email, user.password, user.confirmPassword, user.currency);

        });

        await test.step('Check user registered', async ()=> {
            await registrationPage.verifyRegistrationSuccess(user.fullName);
        });





    });
});
import { test } from '@playwright/test';
import { RegistrationPage } from '../page/RegistrationPage';
import { generateUser } from '../utils/helperData';
import { generateUserWithConfirmation } from '../utils/faker';
import { LoginPage } from '../page/LoginPage';


test.describe('Registration Page Tests', () => {
    let registrationPage: RegistrationPage;
    let loginPage: LoginPage;
    const user = generateUser();
    const userFake = generateUserWithConfirmation();


    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        registrationPage = new RegistrationPage(page);
        loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.verifyPageLoaded();
     
    });

    test('@smoke Check registration with valid values', async ({ page }) => {

        await test.step('Check registration page is opened', async () => {
            await registrationPage.openRegistrationPage();
            await registrationPage.verifyRegistationFormOpened();

        });

        await test.step('Register user with valid data', async () => {
            await registrationPage.register(user.fullName, user.email, user.password, user.confirmPassword, user.currency);

        });

        await test.step('Check user registered', async () => {
            await registrationPage.verifyRegistrationSuccess(user.fullName);
        });
});
    
    test('@fake Check registration with fake values', async ({ page }) => {

        await test.step('Check registration page is opened', async () => {
            await registrationPage.openRegistrationPage();
            await registrationPage.verifyRegistationFormOpened();

        });

        await test.step('Register user with valid data', async () => {
            await registrationPage.register(userFake.fullName, userFake.email, userFake.password, userFake.confirmPassword, userFake.currency);

        });

        await test.step('Check user registered', async () => {
            await registrationPage.verifyRegistrationSuccess(userFake.fullName);
        });






    });
});
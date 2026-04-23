import {Page, Locator, expect} from '@playwright/test'

export class MainMenu {
    readonly page: Page;

    readonly dashboard: Locator;
    readonly transactionMenu: Locator;
    readonly categoriesMenu: Locator;
    readonly budgetsMenu: Locator;
    readonly accountsMenu: Locator;
    readonly reportsMenu: Locator;
    readonly analyticsMenu: Locator;
    readonly settingsMenu: Locator;

    constructor (page: Page){
        this.page=page;
        this.dashboard = page.getByTestId('nav-dashboard');
        this.transactionMenu = page.getByTestId('nav-transactions');
        this.categoriesMenu = page.getByTestId('nav-categories');
        this.budgetsMenu = page.getByTestId('nav-budgets');
        this.accountsMenu = page.getByTestId('nav-accounts');
        this.reportsMenu = page.getByTestId('nav-reports');
        this.analyticsMenu = page.getByTestId('nav-analytics');
        this.settingsMenu = page.getByTestId('nav-settings');
    }

    async dashboardTabClick (){
        await this.dashboard.click();
    }

    

}
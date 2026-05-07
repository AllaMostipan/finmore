import {Page, Locator, expect} from '@playwright/test'
import {Actions} from '../../../function/ActionMethods'

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

    async dashboardTabclickElement (){
        await Actions.clickElement(this.dashboard, 'Dashboard menu');
    }

    async transactionMenuclickElement (){
        await Actions.clickElement(this.transactionMenu, 'Transaction menu');
    }

    async categoriesMenuclickElement (){
        await Actions.clickElement(this.categoriesMenu, 'Categories menu');
    }

    async budgetsMenuclickElement (){
        await Actions.clickElement(this.budgetsMenu, 'Budgets menu');
    }

    async accountsMenuclickElement (){
        await Actions.clickElement(this.accountsMenu, 'Accounts menu');
    }

    async reportsMenuclickElement (){
        await Actions.clickElement(this.reportsMenu, 'Reports menu');
    }

    async analyticsMenuclickElement (){
        await Actions.clickElement(this.analyticsMenu, 'Analytics menu');
    }

    async settingsMenuclickElement (){
        await Actions.clickElement(this.settingsMenu, 'Settings menu');
    }

}
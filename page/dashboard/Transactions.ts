import {Page, Locator, expect} from '@playwright/test';

export class Transactions {
    readonly page: Page;

    readonly addTransactionsButton: Locator;
    readonly transactionFormModal: Locator;


    constructor(page: Page){
        this.page = page;
        this.addTransactionsButton = page.getByTestId('add-transaction-page-button');
        this.transactionFormModal = page.getByTestId('transaction-form-modal');
        

    }
    }

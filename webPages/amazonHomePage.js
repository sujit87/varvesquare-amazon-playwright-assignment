import { page, locator } from '@playwright/test';

export class AmazonHomePage{
    constructor(page){
        this.page = page;
        this.searchInputBox = page.locator('input[id=twotabsearchtextbox]');
        this.searchButton = page.locator('span[id=nav-search-submit-text]');

    }

    async navigateToHomePage(){
        this.page.goto('https://www.amazon.com');
    }

    async searchProduct(productName){
        await this.searchInputBox.waitFor();
        await this.searchInputBox.fill(productName);
        await this.searchButton.click();

    }
}
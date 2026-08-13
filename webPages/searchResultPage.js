import { page, locator } from '@playwright/test';

export class SearchResultsPage {
    constructor(page) {
        this.page = page;

        this.pagination = page.locator(
            'div.s-pagination-container[aria-label="pagination"]'
        );

        this.currentPage = this.pagination.locator(
            '[aria-current="page"]'
        );

        this.nextButton = this.pagination.locator(
            'a[aria-label^="Go to next page"]'
        );

        this.previousButton = this.pagination.locator(
            'a[aria-label^="Go to previous page"]'
        );

        this.lastPage = this.pagination.locator(
            "//a[contains(@class, 's-pagination-next')]/ancestor::li/preceding-sibling::*[1]"
        );
        this.thirdProductNameText = this.page.locator("(//div[@data-component-type='s-search-result']/div/div/span)[3]//h2/span");
    }

    async getCurrentPageNumber() {
    const currentPageText = await this.currentPage.innerText();
    return Number(currentPageText.trim());
    }

    async getLastPageNumber() {
    const lastPageText = await this.lastPage.innerText();
    return Number(lastPageText.trim());
    }

    async navigateToPage(targetPage) {
    const lastPage = await this.getLastPageNumber();

    if (targetPage < 1 || targetPage > lastPage) {
        throw new Error(
            `Invalid target page ${targetPage}. Available pages: 1-${lastPage}`
        );
    }

    let currentPage = await this.getCurrentPageNumber();

    while (currentPage !== targetPage) {
        if (currentPage < targetPage) {
            await this.nextButton.click();
        } else {
            await this.previousButton.click();
        }

        const expectedPage = currentPage < targetPage
            ? currentPage + 1
            : currentPage - 1;

        await this.pagination.locator(
            `[aria-current="page"][aria-label="Page ${expectedPage}"]`
        ).waitFor();

        currentPage = await this.getCurrentPageNumber();
    }

    console.log(`Successfully navigated to page ${currentPage}`);

    return currentPage;
}

async navigateToRandomPage(minPage = 3, maxPage = 10) {
    const lastPage = await this.getLastPageNumber();

    if (lastPage < minPage) {
        throw new Error(
            `Cannot navigate to a page between ${minPage} and ${maxPage}. ` +
            `Only ${lastPage} pages are available.`
        );
    }

    const effectiveMaxPage = Math.min(maxPage, lastPage);

    const targetPage =
        Math.floor(
            Math.random() * (effectiveMaxPage - minPage + 1)
        ) + minPage;

    console.log(
        `Last page: ${lastPage}, ` +
        `Random target page: ${targetPage}`
    );

    await this.navigateToPage(targetPage);

    return targetPage;
}

async getThirdProductName(){

    const thirdProductName =  await this.thirdProductNameText.innerText();
    console.log(`Third Product Name is : ${thirdProductName}`);
    return thirdProductName;
}

}

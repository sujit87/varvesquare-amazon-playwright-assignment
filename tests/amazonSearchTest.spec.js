import { test, expect } from '@playwright/test';
import { AmazonHomePage } from '../webPages/amazonHomePage.js';
import { SearchResultsPage } from '../webPages/searchResultPage.js';

test('search mobile phones on amazon', async ({page}) => {
    //Page object classes object creation
    const amazonHomePage = new AmazonHomePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    //Navigating to Amazon.com
    await amazonHomePage.navigateToHomePage();
    //Searching for "Mobile Phones"
    await amazonHomePage.searchProduct('Mobile Phones');
    //Navigating to page between 3 to 10
    const randomPage = await searchResultsPage.navigateToRandomPage(3,10);

    console.log("Random Page: "+randomPage);
    //Getting and printing the third product from the result list
    await searchResultsPage.getThirdProductName();
})
# Amazon Mobile Phones - Playwright Automation

## Overview

This project automates the given Amazon UI test scenario using Playwright, JavaScript and Page Object Model (POM).

## Test Scenario

1. Navigate to Amazon.
2. Search for "Mobile Phones".
3. Get the available number of pages.
4. Randomly select a page between 3 and 10, based on the available pages.
5. Navigate to the selected page using pagination.
6. Get the 3rd product from the page.
7. Print the product name.

## Tech Stack

- JavaScript
- Playwright
- Node.js
- Page Object Model (POM)

## Project Structure

```text
amazon-playwright-assignment/
│
├── webPages/
│   ├── AmazonHomePage.js
│   └── SearchResultsPage.js
│
├── tests/
│   └── amazon-mobile-phones.spec.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md

## POM

### AmazonHomePage

Handles:

- Opening Amazon
- Searching for a product

### SearchResultsPage

Handles:

- Current page
- Last page
- Pagination
- Random page selection
- Getting the 3rd product

## Installation

Clone the repository and install dependencies:

    git clone <REPOSITORY_URL>
    cd amazon-playwright-assignment
    npm install
    npx playwright install

## Run the Test

Run in headed mode:

    npx playwright test tests/amazon-mobile-phones.spec.js --headed

Run in headless mode:

    npx playwright test tests/amazon-mobile-phones.spec.js

## Notes

- Pagination handles both Next and Previous navigation.
- The last page is determined dynamically and is not hard-coded.
- The random page is selected between page 3 and page 10, depending on the available pages.
- The test prints the name of the 3rd product in the console.
- The test works with Amazon's live website, so search results and product names may vary.

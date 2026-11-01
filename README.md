# Playwright Banking Framework

A lightweight Playwright test automation project for a banking demo app. It includes a small local web app, a page object model, and automated tests for login, dashboard verification, and fund transfer validation.

This project is designed to help you:

- learn Playwright in a realistic UI testing flow
- structure tests in a clean, maintainable way
- build a reusable banking test framework
- run and extend the suite quickly in a local environment

## Project purpose

The app simulates a simple banking dashboard with:

- user login
- account balance display
- transfer validation
- account summary checks

The automation suite covers:

- login flow tests
- dashboard/account validation checks
- transfer success and failure scenarios
- page object model structure for scalability

## Tech stack

- Node.js
- Playwright
- JavaScript
- Local demo banking app served by a simple Node server

## Prerequisites

Before starting, make sure you have:

- Node.js installed
- npm installed
- internet access to install Playwright browser dependencies

## Setup

1. Open a terminal in the project folder.
2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install --with-deps chromium
```

4. Start the local app and tests automatically through the configured Playwright setup.

## Run the project

Run the full test suite:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run tests in UI mode:

```bash
npm run test:ui
```

Run in debug mode:

```bash
npm run test:debug
```

## Project structure

```text
playwright-banking-framework/
├── public/
│   └── index.html
├── pages/
│   ├── BasePage.js
│   ├── LoginPage.js
│   └── DashboardPage.js
├── tests/
│   ├── login.spec.js
│   ├── dashboard.spec.js
│   ├── transfer.spec.js
│   └── smoke.spec.js
├── playwright.config.js
├── server.js
├── package.json
├── README.md
└── package-lock.json
```

## What each folder does

### public/

Contains the demo banking web app UI.

### pages/

Holds the page object model classes used to model UI interactions.

- BasePage.js: common base logic
- LoginPage.js: login form interactions and assertions
- DashboardPage.js: dashboard and transfer interactions

### tests/

Contains the automated test cases.

- login.spec.js: login success/failure checks
- dashboard.spec.js: account summary and dashboard checks
- transfer.spec.js: valid and invalid transfer scenarios
- smoke.spec.js: quick smoke test

## Local app details

The project includes a small local server that serves the banking demo page and exposes endpoints such as:

- /api/login
- /api/accounts
- /api/transfer

This allows the automation tests to exercise a realistic flow without needing a separate external banking system.

## How to continue working on it

To extend the framework:

1. Add new page objects for additional screens or flows.
2. Add new test files under the tests folder.
3. Reuse the existing login and dashboard page objects to keep tests readable.
4. Keep assertions focused on user-visible behavior.
5. Run the suite often with npm test while building new coverage.

## Example workflow

```bash
npm install
npx playwright install --with-deps chromium
npm test
```

## Notes

- The project is intentionally simple so it is easy to understand and extend.
- Use page objects instead of repeating selectors directly in each test.
- Keep test names descriptive so anyone reading the suite knows what behavior is being verified.

## License

ISC

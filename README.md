# Toolshop Test Automation

End-to-end UI and API test automation for the [Practice Software Testing (Toolshop)](https://practicesoftwaretesting.com) demo e-commerce application, built with Playwright and JavaScript.

This project was built with AI assistance (GitHub Copilot and Playwright MCP) under continuous human review. Every architectural and implementation decision was reviewed, questioned, and where necessary corrected. The goal was not to generate tests quickly, but to build a suite whose every line can be explained and defended.

## What this project demonstrates

- UI automation using the Page Object Model
- API automation using the Service Object Pattern
- A manual-first approach: test cases are designed before they are automated
- Externalised test data separated from test logic
- A Dockerised CI pipeline running on GitHub Actions
- Critical review of AI-generated code, including anti-patterns caught and real-world testing challenges diagnosed

## Tech stack

| Area | Tool |
|------|------|
| Test framework | Playwright |
| Language | JavaScript |
| AI assistance | GitHub Copilot, Playwright MCP |
| IDE | VS Code |
| CI/CD | GitHub Actions |
| Container | Microsoft Playwright Docker image |
| Version control | Git / GitHub |

## Project structure

```
toolshop-project/
├── pages/                    Page Objects for UI tests
│   ├── LoginPage.js
│   ├── ProductPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── services/                 Service Objects for API tests
│   ├── AuthService.js
│   ├── ProductService.js
│   ├── CartService.js
│   └── InvoiceService.js
├── tests/
│   ├── UI/                   UI test specs
│   └── API/                  API test specs
├── fixtures/
│   └── test-data.json        Centralised test data
├── input/
│   └── manual-tests.md       Manual test case designs
├── .github/
│   ├── workflows/            CI pipeline definition
│   └── instructions/         Project context for AI tooling
└── playwright.config.js
```

## Test approach

Tests were designed manually before being automated. Each manual test case (documented in `input/manual-tests.md`) describes the scenario, steps, and expected result. Automation was then generated against these designs, verified against the live application using Playwright MCP, and reviewed by hand.

**UI tests** use the Page Object Model. Each page of the application is a class that encapsulates its locators and interactions, keeping test specs focused on business intent rather than implementation detail.

**API tests** use the Service Object Pattern, the same principle applied to API domains. Each service (Auth, Product, Cart, Invoice) wraps a group of related endpoints. Test specs compose these services to verify both individual capabilities and complete journeys.

## Coverage

### UI tests
- Customer login with valid credentials
- Browse and view a product detail page
- Add a product to cart and verify the cart updates
- Complete the checkout flow end to end

### API tests
- Login and retrieve a bearer token
- Retrieve the product catalogue
- Create a cart and add a product
- Create an invoice (the full authenticated checkout journey, composing all services)
- Reject access to a protected endpoint when no token is supplied

## Running the tests

Prerequisites: Node.js and npm installed.

```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install

# Run all tests
npx playwright test

# Run UI tests only
npx playwright test tests/UI/

# Run API tests only
npx playwright test tests/API/

# Run in headed mode (watch the browser)
npx playwright test --headed

# View the HTML report after a run
npx playwright show-report
```

## Troubleshooting a failing test

When a test fails and the error message alone is not enough, these are the tools used most on this project, in order of usefulness.

**Trace viewer.** The single most useful debugging tool. It records every step of a run with screenshots, network requests, request and response bodies, console output, and the DOM state at each point. It is a time-travel view of exactly what happened.

```bash
# Enable tracing in playwright.config.js:  use: { trace: 'on' }
# (use 'retain-on-failure' to only keep traces for failed tests)

# After a run, open the trace
npx playwright show-trace test-results/<path-to>/trace.zip
```

Inside the viewer, the Network and Payload tabs show the actual API requests and responses, which is essential for debugging API tests.

**Headed mode.** Watch the browser perform the test in real time. Useful when the failure is visual and the logs do not make it obvious.

```bash
npx playwright test <spec-file> --headed --project=chromium
```

**Debug mode.** Steps through the test line by line and opens the Playwright Inspector, which includes a locator picker for testing selectors against the live DOM.

```bash
npx playwright test <spec-file> --debug
```

**Console logging.** For quickly inspecting an API response shape, log it directly in the spec. Blunt, but fast.

```javascript
const body = await response.json();
console.log('Response:', JSON.stringify(body, null, 2));
```

**Single browser, single file.** When output is noisy, narrow the run down.

```bash
npx playwright test tests/API/auth.spec.js --project=chromium
```

### Common failures seen on this project

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Timeout on `waitForLoadState('networkidle')` | Site never reaches network idle due to background traffic | Remove the wait; Playwright auto-waits on actions |
| `strict mode violation: resolved to N elements` | Locator matches more than one element | Make the locator specific, or use `{ exact: true }` on `getByLabel` |
| `X is not a function` | Method missing from a page or service class | Confirm the method exists and is exported |
| `Cannot read properties of undefined` | A locator or field was never defined | Check the constructor and property names |
| API returns `401 Unauthorized` with a valid token | Token expired (5 minute lifetime) | Acquire a fresh token immediately before the request |
| All request fields reported as missing | Malformed JSON in the request body | Check for unescaped characters breaking the payload |

## CI/CD

The pipeline is defined in `.github/workflows/playwright.yml` and runs on every push to `main` and on pull requests. It uses the official Microsoft Playwright Docker image, which ships with Node.js and all browsers preinstalled, ensuring the CI environment matches local execution.

The HTML report is uploaded as a build artifact and retained for 30 days.

CI currently runs the API test suite only. See Known Issues below.

## Known issues and findings

These are documented deliberately. Finding and articulating them is part of the work.

**UI tests are blocked in CI by bot detection.** The demo site serves a security verification challenge to traffic from cloud data-centre IP addresses (such as GitHub Actions runners). UI tests pass consistently when run locally but fail in CI at the post-login step. In a real project this would be resolved by whitelisting CI IP ranges with the application team or by targeting a dedicated test environment without bot protection. CI therefore runs API tests, which bypass browser fingerprinting.

**API tokens expire after five minutes.** The login endpoint returns `expires_in: 300`. Long test runs cannot reuse a single token. Tests that need authentication acquire a fresh token as part of their setup.

**The invoice endpoint response is thinner than expected.** `POST /invoices` returns billing details, totals, and invoice identifiers, but does not include line items, an explicit order status, or a nested payment confirmation object. Test assertions reflect what the API actually returns. In a real project this discrepancy would be raised with the API team to confirm whether it is intentional.

## Roadmap

- Migrate UI locators to `data-test` attributes for resilience against UI text changes
- Add environment configuration (separate config per environment) for URL and credential management
- Introduce test tagging (`@smoke`, `@regression`) for selective CI runs
- Externalise remaining hardcoded values (quantities, base URLs)
- Add negative-path API coverage (invalid payloads, malformed requests)
- Split UI and API CI workflows into separate pipelines
- Host the HTML report via GitHub Pages for one-click viewing

## A note on AI-assisted development

This project used AI tooling heavily for code generation, but the value is in the review layer. Examples of issues caught and corrected during development:

- A hard-wait anti-pattern (`waitForTimeout`) that would have introduced flakiness
- A `waitForLoadState('networkidle')` call that hung because the site never reaches network idle
- Locator strict-mode collisions where a label matched multiple elements
- A service class that was generated but never wired into its test, silently bypassing the pattern
- A test race condition where login state was not fully established before the next action fired, fixed with a synchronisation assertion rather than a blind wait

AI accelerates generation. Judgement is what makes the output trustworthy.

# SauceDemo E2E Automation Suite (Playwright + TypeScript)

A sample end-to-end test automation project built to demonstrate freelance
QA automation skills — Page Object Model architecture, UI + API testing,
data-driven tests, and CI/CD integration.

**Target under test:** [saucedemo.com](https://www.saucedemo.com) — a public
demo e-commerce site maintained by Sauce Labs specifically for practicing
test automation.

## What this project demonstrates

- **Page Object Model (POM)** — locators and actions are isolated in
  `pages/`, so tests stay readable and only one file needs updating if the
  UI changes.
- **Cross-browser testing** — the same suite runs against Chromium,
  Firefox, and WebKit via Playwright's built-in device/browser matrix.
- **Data-driven tests** — the sorting test loop (`cart-and-sorting.spec.ts`)
  runs the same assertion logic across multiple sort options instead of
  copy-pasting near-identical tests.
- **API testing** — `api-example.spec.ts` shows automation isn't limited to
  the UI: status codes, response shape, and response-time thresholds are
  checked directly against a REST endpoint.
- **CI/CD integration** — `.github/workflows/playwright.yml` runs the full
  suite on every push/PR and uploads the HTML report as a build artifact.
- **Resilient waiting & assertions** — uses Playwright's auto-waiting and
  web-first assertions (`expect(locator).toBeVisible()`, etc.) instead of
  hardcoded `sleep()` calls, which is a common flakiness source in weaker
  automation suites.

## Project structure

```
qa-portfolio/
├── pages/
│   ├── LoginPage.ts        # Page Object for the login screen
│   └── InventoryPage.ts    # Page Object for the product listing page
├── tests/
│   ├── login.spec.ts               # Valid/invalid/locked-out login scenarios
│   ├── cart-and-sorting.spec.ts    # Cart badge + data-driven sort tests
│   └── api-example.spec.ts         # API-level smoke tests
├── .github/workflows/playwright.yml  # CI pipeline
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## Running it locally

```bash
npm install
npx playwright install --with-deps
npm test              # run headless across all 3 browsers
npm run test:headed   # watch it run in a real browser window
npm run test:ui       # Playwright's interactive UI mode (great for debugging)
npm run report        # view the last HTML report
```

## Test accounts used (seeded by SauceDemo for this exact purpose)

| Username | Password | Behavior |
|---|---|---|
| `standard_user` | `secret_sauce` | Normal flow |
| `locked_out_user` | `secret_sauce` | Blocked at login |

## Notes for prospective clients

This is a portfolio piece, not a production suite for a real client system —
but it's built the way I'd structure a real project: page objects instead of
inline selectors, data-driven tests instead of copy-paste, real CI
integration, and both UI and API coverage. Happy to walk through the code on
a call or adapt this exact structure to your product's login/checkout flow
as a quick paid trial.

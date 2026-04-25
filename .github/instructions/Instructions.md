This is a Playwright JavaScript test automation project for https://practicesoftwaretesting.com (Toolshop).

Project structure:
- tests/ui/ — Playwright UI test specs
- tests/api/ — API test specs  
- pages/ — Page Object Model classes
- input/ — manual test cases and reference docs

Conventions:
- JavaScript only, no TypeScript
- Page Object Model pattern
- Locators using getByRole, getByLabel, getByPlaceholder preferred over CSS or XPath
- Tests should be independent and not rely on each other


Test credentials:
- Customer login: customer@practicesoftwaretesting.com / welcome01
- Admin login: admin@practicesoftwaretesting.com / welcome01

Key site details:
- Products are listed on the home page by default
- Cart icon is in the top navigation bar
- Checkout requires login first
- API base URL: https://api.practicesoftwaretesting.com
- Login API endpoint: POST /users/login returns a Bearer token
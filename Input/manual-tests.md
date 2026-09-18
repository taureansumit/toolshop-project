# Manual Test Cases - ToolShop

## Test Case 1: Login with Valid Credentials

**Test ID:** MT-001  
**Test Name:** Customer Login - Valid Credentials  
**Objective:** Verify that a customer can successfully log in to the application with valid credentials

**Pre-conditions:**
- User is on the ToolShop home page (https://practicesoftwaretesting.com)
- Application is fully loaded
- Valid customer credentials are available

**Steps:**
1. Click on the login/account icon in the top navigation bar
2. Enter email: `customer@practicesoftwaretesting.com`
3. Enter password: `welcome01`
4. Click the "Login" button
5. Wait for page to load and verify redirection

**Expected Result:**
- User is successfully authenticated
- User is redirected to the dashboard or home page
- User's account name/email appears in the top navigation
- No error messages are displayed

---

## Test Case 2: Browse and Open a Product Detail Page

**Test ID:** MT-002  
**Test Name:** Browse Products and View Product Details  
**Objective:** Verify that a user can browse products on the home page and open a product detail page

**Pre-conditions:**
- User is on the ToolShop home page (https://practicesoftwaretesting.com)
- Application is fully loaded
- Products are displayed on the home page

**Steps:**
1. Observe the products listed on the home page
2. Scroll through the product list to view available items
3. Click on any product card or product name to open the product detail page
4. Wait for the product detail page to load completely

**Expected Result:**
- Product detail page loads successfully
- Product information is displayed including:
  - Product name/title
  - Product description
  - Product price
  - Product image
  - Availability status
  - "Add to Cart" button
- All product details are clearly visible and readable
- No 404 or error messages appear

---

## Test Case 3: Add a Product to Cart and Verify Cart Updates

**Test ID:** MT-003  
**Test Name:** Add Product to Cart and Verify Cart Counter  
**Objective:** Verify that products can be added to the cart and the cart is updated correctly

**Pre-conditions:**
- User is on a product detail page
- Product is in stock and available
- Cart is empty (or user notes the current cart count)
- Cart icon is visible in the top navigation bar

**Steps:**
1. Note the current cart counter value in the top navigation (if any)
2. Select a quantity for the product (if quantity selector is available)
3. Click the "Add to Cart" button
4. Wait for the page to update (watch for confirmation message or animation)
5. Check the cart icon in the top navigation bar
6. Click on the cart icon to view the cart contents

**Expected Result:**
- A success message or confirmation appears (e.g., "Added to cart")
- The cart counter in the top navigation increments by the quantity added
- Cart page displays the product that was just added
- Product details in cart (name, price, quantity) match the product detail page
- Cart total is calculated correctly

---

## Test Case 4: Complete the Checkout Flow

**Test ID:** MT-004  
**Test Name:** Complete Checkout Process  
**Objective:** Verify that a user can successfully complete a purchase through the checkout flow

**Pre-conditions:**
- User is logged in with valid customer credentials
- User has at least one product in the cart
- User is on the cart page
- Shipping and payment information is available

**Steps:**
1. Verify the cart contains the product(s)
2. Review cart totals and click "Checkout" or "Proceed to Checkout" button
3. Verify login is required; log in if prompted with:
   - Email: `customer2@practicesoftwaretesting.com`
   - Password: `welcome01`
4. Fill in the delivery/shipping address information (if required):
   - First Name
   - Last Name
   - Address
   - City
   - State/Province
   - Postal Code
   - Country
5. Select a shipping method (if available)
6. Proceed to payment information
7. Enter payment details (use test/dummy payment information if available)
8. Review the order summary
9. Click "Place Order" or "Complete Purchase" button
10. Wait for order confirmation page

**Expected Result:**
- All checkout steps complete without errors
- Order confirmation page is displayed
- Confirmation shows:
  - Order number/ID
  - Order date/time
  - Ordered items with quantities and prices
  - Total amount paid
  - Delivery address
- Success message confirms the order was placed
- Confirmation email message or option is presented
- User is able to view order history or confirmation details

---

## API Test Case 1: Successful Login Returns Bearer Token

**Test ID:** API-001  
**Test Name:** Admin Login - Obtain Bearer Token  
**Objective:** Verify that the admin can successfully authenticate via the API and receive an access token

**Pre-conditions:**
- API base URL is available: https://api.practicesoftwaretesting.com
- Admin credentials are available: `admin@practicesoftwaretesting.com` / `welcome01`
- Note: tokens issued by the API expire after 5 minutes (`expires_in: 300`)

**Steps:**
1. Send a POST request to `/users/login` with JSON body:
   - `email`: `admin@practicesoftwaretesting.com`
   - `password`: `welcome01`
2. Observe the HTTP response status and body

**Expected Result:**
- Response status is `200 OK`
- Response body contains:
  - `access_token` as a non-empty string
  - `token_type` equal to `bearer`
  - `expires_in` equal to `300`
- The `access_token` can be used in `Authorization: Bearer <token>` for subsequent protected requests

---

## API Test Case 2: Get Products List

**Test ID:** API-002  
**Test Name:** Retrieve Products List  
**Objective:** Verify that the products endpoint returns a paginated list of products

**Pre-conditions:**
- API base URL is available: https://api.practicesoftwaretesting.com

**Steps:**
1. Send a GET request to `/products`
2. Observe the HTTP response status and body

**Expected Result:**
- Response status is `200 OK`
- Response body contains pagination metadata such as `current_page`, `data`, `from`, `last_page`, `per_page`, `to`, and `total`
- The `data` array contains product objects with fields including `id`, `name`, `price`, and `in_stock`

---

## API Test Case 3: Create Cart and Add Product

**Test ID:** API-003  
**Test Name:** Create Cart and Add Product  
**Objective:** Verify that a cart can be created and a product can be added to that cart via the API

**Pre-conditions:**
- API base URL is available: https://api.practicesoftwaretesting.com
- A valid `product_id` exists (obtainable from `/products`)

**Steps:**
1. Send a POST request to `/carts` with an empty JSON body to create a new cart
2. Capture the returned `id` from the response as `cartId`
3. Send a POST request to `/carts/{cartId}` with JSON body:
   - `product_id`: `<valid product id>`
   - `quantity`: `1`
4. Observe both HTTP responses and bodies

**Expected Result:**
- Cart creation response status is `201 Created`
- Cart creation response body contains `id`
- Add-to-cart response status is `200 OK`
- Add-to-cart response body contains `result: 'item added or updated'`

---

**Expected Result:**
- Response status is `201 Created`
- Response body contains:
  - `invoice_number` (format: `INV-YYYYNNNNNN`)
  - `id` (invoice UUID)
  - `subtotal` and `total` (numeric)
  - `billing_street`, `billing_city`, `billing_state`, `billing_country`, `billing_postal_code` matching the request
  - `invoice_date` and `created_at` timestamps
  - `user_id` matching the authenticated user
- Invoice is associated with the provided `cart_id` (verified via other endpoints if needed)

**Note:** The response does not currently include `status`, `invoicelines`, or a nested `payment` object. This was verified against the live API. Documented as a finding — the API contract may differ from what a consumer might expect for a POST /invoices response.

---

## API Test Case 5: Access Protected Endpoint Without Token Returns 401

**Test ID:** API-005  
**Test Name:** Unauthorized Access to Protected Endpoint  
**Objective:** Verify that accessing a protected endpoint without an Authorization token returns `401 Unauthorized`

**Pre-conditions:**
- API base URL is available: https://api.practicesoftwaretesting.com
- No `Authorization` header will be sent with the request

**Steps:**
1. Send a POST request to `/invoices` WITHOUT including the `Authorization` header
2. Observe the HTTP response status and body

**Expected Result:**
- Response status is `401 Unauthorized`
- Response body contains an error message such as `Unauthorized`


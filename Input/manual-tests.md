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
   - Email: `customer@practicesoftwaretesting.com`
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

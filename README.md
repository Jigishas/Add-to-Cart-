# Shopping Cart Functionality

This JavaScript module provides complete e-commerce cart functionality including adding/removing items, quantity management, and checkout processing.

## Key Features

- **Add to Cart**: Click handler for product buttons
- **Cart Management**:
  - Quantity adjustment
  - Item removal
  - Total cost calculation
- **UI Components**:
  - Slide-out cart panel
  - Overlay effect
  - Cart counter with animation
- **Checkout Process**:
  - Data preparation
  - Validation
  - Order processing

## Code Structure

### Main Components

1. **DOM Elements**:
   - Product list container
   - Cart items container
   - Total cost display
   - Cart toggle button
   - Cart panel

2. **Cart Data**:
   - Stores items as `{productName: {quantity, price}}`
   - Maintains current cart state

3. **Core Functions**:

```javascript
// Add product to cart
function handleAddToCart(event) {
  // Gets product details and updates cart
}

// Update cart display
function updateCartDisplay() {
  // Renders all cart items and calculates total
}

// Remove item from cart  
function removeFromCart(productName) {
  // Decreases quantity or removes item
}
```

### Event Handlers

- `DOMContentLoaded`: Initializes cart
- `click` on add-to-cart buttons
- `click` on remove-item buttons
- `click` on cart toggle/close buttons

## Usage Example

1. Include the script in your HTML:
```html
<script src="mainss.js"></script>
```

2. Required HTML structure:
```html
<div id="product-list">
  <!-- Products with add-to-cart buttons -->
</div>

<div id="cart">
  <ul id="cart-items"></ul>
  <div id="total-cost"></div>
  <button class="checkout-btn">Checkout</button>
</div>
```

## Dependencies

- Modern browser with ES6 support
- No external libraries required

## Customization

To modify:
- Styling: Update CSS classes
- Checkout: Replace `processCheckout()` implementation
- Product data: Adjust `handleAddToCart()` parsing

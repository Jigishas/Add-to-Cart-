document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const totalCostElement = document.getElementById('total-cost');
    const cartToggle = document.getElementById('cart-toggle');
    const cartPanel = document.getElementById('cart');
    const closeCart = document.querySelector('.close-cart');
    const cartCountElement = document.getElementById('cart-count');
  
    // Create overlay element
    const cartOverlay = document.createElement('div');
    cartOverlay.className = 'cart-overlay';
    document.body.appendChild(cartOverlay);
  
    // Cart data
    let cartData = {};
  
    // Initialize cart
    updateCartCount();
  
    // Event Listeners
    productList.addEventListener('click', handleAddToCart);
    cartToggle.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
  
    // Functions
    function handleAddToCart(event) {
      if (event.target.classList.contains('add-to-cart')) {
        const product = event.target.parentNode;
        const productName = product.querySelector('h2').textContent;
        const productPrice = parseFloat(product.querySelector('p').textContent);
  
        // Add/update product in cart
        if (!cartData[productName]) {
          cartData[productName] = { 
            quantity: 1, 
            price: productPrice 
          };
        } else {
          cartData[productName].quantity++;
        }
  
        updateCartDisplay();
        updateCartCount();
      }
    }
  
    function updateCartDisplay() {
      cartItems.innerHTML = '';
      let totalCost = 0;
      
      for (const productName in cartData) {
        const item = cartData[productName];
        const itemTotal = item.price * item.quantity;
        totalCost += itemTotal;
        
        const itemElement = document.createElement('li');
        itemElement.innerHTML = `
          <span>${productName} (${item.quantity} × $${item.price.toFixed(2)})</span>
          <span>$${itemTotal.toFixed(2)}</span>
          <button class="remove-item" data-product="${productName}">×</button>
        `;
        cartItems.appendChild(itemElement);
      }
  
      totalCostElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
      
      // Add event listeners to new remove buttons
      document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
          removeFromCart(this.getAttribute('data-product'));
        });
      });
    }
  
    function removeFromCart(productName) {
      if (cartData[productName]) {
        if (cartData[productName].quantity > 1) {
          cartData[productName].quantity--;
        } else {
          delete cartData[productName];
        }
        updateCartDisplay();
        updateCartCount();
      }
    }
  
    function toggleCart() {
      cartPanel.classList.toggle('active');
      cartOverlay.classList.toggle('active');
      document.body.style.overflow = cartPanel.classList.contains('active') ? 'hidden' : '';
    }
  
    function updateCartCount() {
      const totalItems = Object.values(cartData).reduce((sum, item) => sum + item.quantity, 0);
      cartCountElement.textContent = totalItems;
      cartCountElement.setAttribute('data-count', totalItems);
      cartCountElement.classList.add('update');
      setTimeout(() => cartCountElement.classList.remove('update'), 300);
    }
  });
  // Add this to your existing cart JavaScript
const checkoutBtn = document.querySelector('.checkout-btn');

checkoutBtn.addEventListener('click', function() {
  if (Object.keys(cartData).length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  // Process checkout - replace with your actual logic
  processCheckout();
});

function processCheckout() {
  // 1. Prepare checkout data
  const checkoutData = {
    items: Object.entries(cartData).map(([name, item]) => ({
      name,
      quantity: item.quantity,
      price: item.price
    })),
    total: calculateTotal(),
    date: new Date().toISOString()
  };

  // 2. Here's where you would typically:
  //    - Send data to your backend
  //    - Redirect to a checkout page
  //    - Open a payment modal
  //    - etc.
  
  // Example: Show confirmation (replace with your logic)
  console.log('Checking out:', checkoutData);
  alert(`Proceeding to checkout with ${checkoutData.items.length} items. Total: $${checkoutData.total.toFixed(2)}`);
  
  // Example: Clear cart after checkout
  cartData = {};
  updateCartDisplay();
  updateCartCount();
  toggleCart(); // Close cart drawer
}

function calculateTotal() {
  return Object.values(cartData).reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );
}
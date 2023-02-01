// Get the add-to-cart and remove-from-cart buttons and cart-count element
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
const removeFromCartButtons = document.querySelectorAll('.remove-from-cart-button');
const cartCountElement = document.querySelector('#cart-count');

// Get the cart count from local storage (or set to 0 if it doesn't exist)
let cartCount = localStorage.getItem('cartCount') || 0;

// Update the count displayed on the cart icon
cartCountElement.textContent = cartCount;

// Add an event listener to each add-to-cart button
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Increment the cart count
    cartCount++;

    // Update the count displayed on the cart icon
    cartCountElement.textContent = cartCount;

    // Store the updated cart count in local storage
    localStorage.setItem('cartCount', cartCount);
  });
});

// Add an event listener to each remove-from-cart button
removeFromCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Decrement the cart count
    cartCount--;

    // Update the count displayed on the cart icon
    cartCountElement.textContent = cartCount;

    // Store the updated cart count in local storage
    localStorage.setItem('cartCount', cartCount);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  displayCart();

  document.getElementById('clear-cart-btn').addEventListener('click', function() {
    clearCart();
  });
});

function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartList = document.getElementById('cart');
  cartList.innerHTML = '';

  if (cart.length > 0) {
    cart.forEach((item, index) => {
      let listItem = document.createElement('li');
      listItem.innerHTML = `<img src="${item.image || 'placeholder.png'}" alt="${item.name}" width="100"> ${item.name} <button class="remove-item-btn" data-index="${index}">Supprimer</button>`;
      cartList.appendChild(listItem);
    });
  } else {
    cartList.innerHTML = '<p>Le panier est vide.</p>';
  }

  document.querySelectorAll('.remove-item-btn').forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      removeItem(index);
    });
  });
}

function clearCart() {
  localStorage.removeItem('cart');
  displayCart();
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

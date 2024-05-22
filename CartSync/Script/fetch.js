let currentPage = 1;
const itemsPerPage = 15;
let allProducts = [];

document.getElementById('search-btn').addEventListener('click', function() {
  let searchInput = document.getElementById('search-input').value.trim();
  if (searchInput !== '') {
    fetch(`https://world.openfoodfacts.org/api/v2/search?categories_tags_fr=${encodeURIComponent(searchInput)}&fields=code,product_name,image_url`)
      .then(response => response.json())
      .then(data => {
        allProducts = data.products;
        currentPage = 1;
        displayResults();
      })
      .catch(error => console.error('Erreur lors de la récupération des données :', error));
  } else {
    alert('Veuillez entrer un produit à rechercher.');
  }
});

function displayResults() {
  let resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = '';

  if (allProducts.length === 0) {
    alert('Aucun résultat trouvé.');
    resultsContainer.innerHTML = '<p>Aucun résultat trouvé.</p>';
  } else {
    let productCount = allProducts.length;
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = Math.min(startIndex + itemsPerPage, productCount);
    let paginatedProducts = allProducts.slice(startIndex, endIndex);
    
    let productList = `<p>${productCount} produit(s) trouvé(s) :</p><ul>`;
    paginatedProducts.forEach(product => {
      productList += `<li>
                        <img src="${product.image_url || 'placeholder.png'}" alt="${product.product_name}" height="100">
                        <p>${product.product_name}</p>
                        <button class="add-to-cart-btn" data-product='${JSON.stringify({name: product.product_name, image: product.image_url})}'>Ajouter au panier</button>
                      </li>`;
    });
    productList += '</ul>';
    resultsContainer.innerHTML = productList;

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', function() {
        addToCart(this.dataset.product);
      });
    });

    displayPagination();
  }
}

function displayPagination() {
  let paginationContainer = document.createElement('div');
  paginationContainer.id = 'pagination';
  let totalPages = Math.ceil(allProducts.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    let pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.classList.add('page-btn');
    if (i === currentPage) {
      pageButton.classList.add('active');
    }
    pageButton.addEventListener('click', function() {
      currentPage = i;
      displayResults();
    });
    paginationContainer.appendChild(pageButton);
  }
  document.getElementById('search-results').appendChild(paginationContainer);
}

function addToCart(productData) {
  const product = JSON.parse(productData);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Produit ajouté au panier !');
  updateCartLink();
}

function updateCartLink() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartLink = document.getElementById('cart-link');

  if (cart.length > 0) {
    cartLink.href = 'cart.html';
  } else {
    cartLink.href = 'cart.html';
  }
}

updateCartLink();

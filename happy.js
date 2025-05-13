
let productsData = [];
let cart = { count: 0, total: 0 };

function fetchProducts() {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      productsData = data;
      displayProducts(data);
    });
}

function displayProducts(products) {
  const productsDiv = document.getElementById('products');
  productsDiv.innerHTML = ''; // Clear
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h4>${product.title}</h4>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick='addToCart(${product.price})'>Add to Cart</button>
    `;
    productsDiv.appendChild(div);
  });
}

function addToCart(price) {
  cart.count += 1;
  cart.total += price;
  document.getElementById('cartCount').textContent = cart.count;
  document.getElementById('cartTotal').textContent = cart.total.toFixed(2);
}

function searchProducts() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtered = productsData.filter(p => p.title.toLowerCase().includes(query));
  displayProducts(filtered);
}
fetchProducts();
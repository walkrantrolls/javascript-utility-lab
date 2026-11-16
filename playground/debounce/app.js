import { debounce } from '../../src/debounce/debounce.js';

const products = [
  { name: 'Wireless Headphones', category: 'Audio', price: 129.99 },
  { name: 'Noise-Canceling Earbuds', category: 'Audio', price: 89.5 },
  { name: 'Studio Monitor Speakers', category: 'Audio', price: 249 },
  { name: 'Mechanical Keyboard', category: 'Accessories', price: 109 },
  { name: 'Wireless Mouse', category: 'Accessories', price: 54.99 },
  { name: 'USB-C Hub', category: 'Accessories', price: 39 },
];
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const input = document.querySelector('#search');
const results = document.querySelector('#results');
const count = document.querySelector('#count');
let searches = 0;

const searchCatalog = debounce((query) => {
  searches += 1;
  count.textContent = searches;
  if (!query.trim()) {
    results.innerHTML = '<div class="empty">Type a product name to search the catalog</div>';
    return;
  }
  const matches = products.filter((product) =>
    `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase()),
  );
  results.innerHTML = matches.length
    ? matches.map((product) => `<article class="item"><div><div class="item-name">${product.name}</div><div class="item-category">${product.category}</div></div><span class="price">${money.format(product.price)}</span></article>`).join('')
    : '<div class="empty">No matching products. Try “audio” or “wireless”.</div>';
}, 400);

input.addEventListener('input', (event) => searchCatalog(event.target.value));

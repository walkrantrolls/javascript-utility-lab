import { debounce } from '../src/functions/debounce/debounce.js';

const products = [
  { name: 'Wireless Headphones', category: 'Audio', price: 129.99 },
  { name: 'Noise-Canceling Earbuds', category: 'Audio', price: 89.5 },
  { name: 'Studio Monitor Speakers', category: 'Audio', price: 249 },
  { name: 'Mechanical Keyboard', category: 'Accessories', price: 109 },
  { name: 'Wireless Mouse', category: 'Accessories', price: 54.99 },
  { name: 'USB-C Hub', category: 'Accessories', price: 39 },
];
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const searchInput = document.querySelector('#search-input');
const resultBox = document.querySelector('#search-results');
const searchCount = document.querySelector('#search-count');
let searches = 0;

const runSearch = debounce((query) => {
  searches += 1;
  searchCount.textContent = searches;
  if (!query.trim()) {
    resultBox.innerHTML = '<div class="result-placeholder">Start typing to search the catalog</div>';
    return;
  }
  const matches = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
  resultBox.innerHTML = matches.length
    ? matches.slice(0, 3).map((product) => `<div class="product-result"><span>${product.name} <span class="muted">· ${product.category}</span></span><b>${money.format(product.price)}</b></div>`).join('')
    : '<div class="result-placeholder">No products found. Try “wireless”.</div>';
}, 400);

searchInput.addEventListener('input', (event) => runSearch(event.currentTarget.value));
document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    searchInput.focus();
    document.querySelector('#debounce').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

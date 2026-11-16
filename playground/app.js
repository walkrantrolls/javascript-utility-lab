import { debounce } from '../src/debounce/debounce.js';
import { throttle } from '../src/throttle/throttle.js';
import { memoize } from '../src/memoize/memoize.js';
import { flatten } from '../src/flatten/flatten.js';
import { curry } from '../src/curry/curry.js';
import { promiseAll } from '../src/promise-all/promise-all.js';

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
  const matches = products.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  resultBox.innerHTML = matches.length
    ? matches.slice(0, 3).map((item) => `<div class="product-result"><span>${item.name} <span class="muted">· ${item.category}</span></span><b>${money.format(item.price)}</b></div>`).join('')
    : '<div class="result-placeholder">No products found. Try “wireless”.</div>';
}, 400);
searchInput.addEventListener('input', (event) => runSearch(event.target.value));

let raw = 0;
let handled = 0;
let running = false;
const handledCount = document.querySelector('#handled-count');
const rawCount = document.querySelector('#raw-count');
const state = document.querySelector('#throttle-state');
const bars = document.querySelector('#stream-bars');
const onEvent = throttle(() => {
  handled += 1;
  handledCount.textContent = handled;
}, 180);
document.querySelector('#fire-events').addEventListener('click', () => {
  if (running) return;
  running = true;
  state.textContent = 'STREAMING';
  bars.classList.add('running');
  let tick = 0;
  const burst = setInterval(() => {
    raw += 1;
    rawCount.textContent = raw;
    onEvent();
    tick += 1;
    if (tick >= 18) {
      clearInterval(burst);
      setTimeout(() => {
        running = false;
        state.textContent = 'READY';
        bars.classList.remove('running');
      }, 220);
    }
  }, 35);
});

const sayHello = curry((greeting, name) => `${greeting}, ${name}!`);
const greet = sayHello('Hello');
document.querySelector('#curry-input').addEventListener('input', (event) => {
  const name = event.target.value.trim() || 'there';
  document.querySelector('#curry-output').textContent = greet(name);
});

const fibonacci = memoize((n) => (n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)));
const fibResult = fibonacci(40);
document.querySelector('#fib-result').textContent = fibResult.toLocaleString('en-US');
document.querySelector('#memo-run').addEventListener('click', () => {
  const start = performance.now();
  fibonacci(40);
  const elapsed = Math.max(performance.now() - start, 0.01);
  document.querySelector('#memo-time').textContent = `⚡ cached in ${elapsed.toFixed(2)}ms`;
});

const nested = [[1, 2], [3, [4, 5]]];
const depthInput = document.querySelector('#flatten-depth');
function updateFlatten() {
  const depth = Number(depthInput.value);
  document.querySelector('#flatten-depth-value').textContent = depth;
  document.querySelector('#flatten-depth-label').textContent = depth === 3 ? '∞' : depth;
  const value = flatten(nested, depth === 3 ? Infinity : depth);
  document.querySelector('#flatten-output').textContent = JSON.stringify(value);
}
depthInput.addEventListener('input', updateFlatten);
updateFlatten();

document.querySelector('#promise-run').addEventListener('click', async () => {
  const rows = ['#request-user', '#request-orders', '#request-recs'].map((selector) => document.querySelector(selector).closest('.request-row'));
  const summary = document.querySelector('#promise-summary');
  summary.textContent = 'Loading dashboard data…';
  rows.forEach((row) => { row.classList.add('pending'); row.lastElementChild.textContent = 'Loading'; });
  const requests = [350, 700, 520].map((delay, index) => new Promise((resolve) => setTimeout(() => resolve(index), delay)));
  await promiseAll(requests);
  rows.forEach((row) => { row.classList.remove('pending'); row.lastElementChild.textContent = 'Ready'; });
  summary.textContent = 'All 3 requests complete';
});

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    searchInput.focus();
    document.querySelector('#debounce').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

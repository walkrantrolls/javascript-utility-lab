import { debounce } from '../src/functions/debounce.js';
import { throttle } from '../src/functions/throttle.js';
import { memoize } from '../src/functions/memoize.js';
import { flatten } from '../src/arrays/flatten.js';
import { unique } from '../src/arrays/unique.js';
import { curry } from '../src/functions/curry.js';
import { promiseAll } from '../src/promises/promiseAll.js';
import { promiseRace } from '../src/promises/promiseRace.js';
import { deepClone } from '../src/objects/deepClone.js';

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


const raceButton = document.querySelector('#race-run');
if (raceButton) {
  const raceRows = ['#race-cache', '#race-edge', '#race-origin'].map((selector) => document.querySelector(selector).closest('.request-row'));
  const raceSummary = document.querySelector('#race-summary');
  raceButton.addEventListener('click', async () => {
    raceButton.disabled = true;
    raceSummary.textContent = 'Waiting for the first response…';
    raceRows.forEach((row) => { row.classList.add('pending'); row.lastElementChild.textContent = 'Waiting'; });
    const requests = [
      { name: 'Cache', delay: 420 },
      { name: 'Edge API', delay: 760 },
      { name: 'Origin API', delay: 1120 },
    ].map((request, index) => new Promise((resolve) => setTimeout(() => resolve({ ...request, index }), request.delay)));
    const winner = await promiseRace(requests);
    raceRows.forEach((row, index) => {
      row.classList.remove('pending');
      row.lastElementChild.textContent = index === winner.index ? `${winner.delay} ms · winner` : 'Completed later';
    });
    raceSummary.textContent = `${winner.name} returned first`;
    Promise.all(requests).then(() => { raceButton.disabled = false; });
  });
}

const uniqueInput = document.querySelector('#unique-input');
if (uniqueInput) {
  const updateUnique = () => {
    const tags = uniqueInput.value.split(',').map((tag) => tag.trim()).filter(Boolean);
    document.querySelector('#unique-output').textContent = JSON.stringify(unique(tags));
  };
  uniqueInput.addEventListener('input', updateUnique);
  updateUnique();
}

const cloneName = document.querySelector('#clone-name');
const cloneTheme = document.querySelector('#clone-theme');
if (cloneName && cloneTheme) {
  const sourceProfile = { name: 'Priya', preferences: { theme: 'Violet' } };
  const updateClone = () => {
    const draft = deepClone(sourceProfile);
    draft.name = cloneName.value || '—';
    draft.preferences.theme = cloneTheme.value || '—';
    document.querySelector('#clone-source').textContent = `${sourceProfile.name} · ${sourceProfile.preferences.theme}`;
    document.querySelector('#clone-copy').textContent = `${draft.name} · ${draft.preferences.theme}`;
  };
  cloneName.addEventListener('input', updateClone);
  cloneTheme.addEventListener('input', updateClone);
  updateClone();
}

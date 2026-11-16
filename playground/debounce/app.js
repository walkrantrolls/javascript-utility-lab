import { debounce } from '../../src/functions/debounce/debounce.js';

const products = [
  { name: 'Wireless Headphones', category: 'Audio', price: 129.99 },
  { name: 'Noise-Canceling Earbuds', category: 'Audio', price: 89.5 },
  { name: 'Studio Monitor Speakers', category: 'Audio', price: 249 },
  { name: 'Mechanical Keyboard', category: 'Accessories', price: 109 },
  { name: 'Wireless Mouse', category: 'Accessories', price: 54.99 },
  { name: 'USB-C Hub', category: 'Accessories', price: 39 },
];
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const byId = (id) => document.getElementById(id);

function renderSearch(query, targetId) {
  const target = byId(targetId);
  if (!query.trim()) {
    target.textContent = 'Type to see matching products';
    return;
  }
  const matches = products.filter((product) =>
    `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase()),
  );
  target.innerHTML = matches.length
    ? `<div class="result-list">${matches.slice(0, 3).map((product) => `<div class="result-product"><span>${product.name}</span><b>${money.format(product.price)}</b></div>`).join('')}</div>`
    : 'No matches. Try “audio” or “wireless”.';
}

let immediateSearches = 0;
let debouncedSearches = 0;
let keystrokes = 0;
let debounceGeneration = 0;
let searchLater;
function recordSearchCall(prefix, args) {
  const count = prefix === 'search-now' ? ++immediateSearches : ++debouncedSearches;
  const timestamp = new Date().toLocaleTimeString();
  byId(`${prefix}-count`).textContent = count;
  byId(`${prefix}-timestamp`).textContent = timestamp;
  byId(`${prefix}-latest-args`).textContent = JSON.stringify(args);

  const history = byId(`${prefix}-history`);
  history.querySelector('.trace-empty')?.remove();
  const entry = document.createElement('div');
  entry.className = 'trace-entry';
  const index = document.createElement('span');
  index.className = 'trace-index';
  index.textContent = `#${history.querySelectorAll('.trace-entry').length + 1}`;
  const received = document.createElement('code');
  received.textContent = JSON.stringify(args);
  const time = document.createElement('time');
  time.textContent = timestamp;
  entry.append(index, received, time);
  history.append(entry);
  history.scrollTop = history.scrollHeight;
  return args[0];
}
function createSearchDebouncer(wait, generation) {
  return debounce((...args) => {
    if (generation !== debounceGeneration) return;
    const query = recordSearchCall('search-later', args);
    renderSearch(query, 'search-later-results');
  }, wait);
}
searchLater = createSearchDebouncer(400, debounceGeneration);
const searchInput = byId('search-input');
const delayInput = byId('debounce-delay');
function updateDelay() {
  const wait = Number(delayInput.value);
  byId('delay-output').textContent = `${wait} ms`;
  byId('search-wait-label').textContent = `${wait} ms`;
  byId('search-delay-metric').innerHTML = `${wait}<span style="font-size:10px"> ms</span>`;
  debounceGeneration += 1;
  searchLater = createSearchDebouncer(wait, debounceGeneration);
  if (searchInput.value.trim()) searchLater(searchInput.value);
}
delayInput.addEventListener('input', updateDelay);
searchInput.addEventListener('input', (event) => {
  const query = event.currentTarget.value;
  keystrokes += 1;
  byId('search-now-keystrokes').textContent = keystrokes;
  byId('search-later-keystrokes').textContent = keystrokes;
  const args = [query];
  renderSearch(recordSearchCall('search-now', args), 'search-now-results');
  searchLater(...args);
});
let immediateLayouts = 0;
let debouncedLayouts = 0;
function updateLayout(target, count, width, height) {
  count();
  byId(`${target}-count`).textContent = target === 'resize-now' ? immediateLayouts : debouncedLayouts;
  byId(`${target}-size`).textContent = `${width} × ${height}`;
  byId(`${target}-preview`).textContent = width < 700 ? 'Compact layout' : 'Wide layout';
}
window.addEventListener('resize', () => {
  const { innerWidth: width, innerHeight: height } = window;
  updateLayout('resize-now', () => { immediateLayouts += 1; }, width, height);
  resizeLater(width, height);
});
const resizeLater = debounce((width, height) => {
  debouncedLayouts += 1;
  updateLayout('resize-later', () => {}, width, height);
}, 250);

let immediateSaves = 0;
let debouncedSaves = 0;
const draftInput = byId('draft-input');
function saveImmediately(value) {
  immediateSaves += 1;
  byId('save-now-count').textContent = immediateSaves;
  byId('save-now-status').textContent = 'Saved';
  byId('save-now-preview').textContent = value || 'Empty draft';
}
const saveLater = debounce((value) => {
  debouncedSaves += 1;
  byId('save-later-count').textContent = debouncedSaves;
  byId('save-later-status').textContent = 'Saved';
  byId('save-later-status').classList.remove('waiting');
  byId('save-later-preview').textContent = value || 'Empty draft';
  byId('save-later-label').textContent = 'Saved after pause';
  byId('save-later-label').classList.remove('waiting');
}, 700);
draftInput.addEventListener('input', (event) => {
  const value = event.currentTarget.value;
  saveImmediately(value);
  byId('save-later-status').textContent = 'Waiting…';
  byId('save-later-status').classList.add('waiting');
  byId('save-later-label').textContent = 'Pending pause';
  byId('save-later-label').classList.add('waiting');
  saveLater(value);
});

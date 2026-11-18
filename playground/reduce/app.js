import '../../src/array/myReduce/myReduce.js';

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const walkValues = [1, 2, 3, 4];
const walkTraces = [];
const walkFinal = walkValues.myReduce((accumulator, value, index) => {
  const next = accumulator + value;
  walkTraces.push({ step: index + 1, before: accumulator, value, after: next });
  return next;
}, 0);
document.querySelector('#walk-values').innerHTML = walkValues.map((value) => `<span class="walk-value">${value}</span>`).join('');
document.querySelector('#walk-steps').innerHTML = walkTraces.map((row) =>
  `<div class="walk-row"><span class="walk-badge">Step ${row.step}</span><div class="walk-step">${row.before} + ${row.value} = ${row.after}</div></div>`,
).join('');
document.querySelector('#walk-final').textContent = walkFinal;

const cart = document.querySelector('#cart-items');
function renderCart() {
  const items = [...cart.querySelectorAll('.cart-row')].map((row) => ({
    name: row.dataset.name,
    price: Number(row.dataset.price),
    quantity: Math.max(0, Math.floor(Number(row.querySelector('input').value) || 0)),
  }));
  const steps = [];
  const total = items.myReduce((subtotal, item, index) => {
    const lineTotal = item.price * item.quantity;
    steps.push({ index: index + 1, item: item.name, before: subtotal, lineTotal, after: subtotal + lineTotal });
    return subtotal + lineTotal;
  }, 0);
  document.querySelector('#cart-total').textContent = money.format(total);
  document.querySelector('#cart-units').textContent = items.myReduce((units, item) => units + item.quantity, 0);
  document.querySelector('#cart-trace').innerHTML = steps.map((step) =>
    `<tr><td>${step.index}</td><td>${step.item}</td><td>${money.format(step.before)}</td><td>${money.format(step.lineTotal)}</td><td>${money.format(step.after)}</td></tr>`,
  ).join('');
}
cart.addEventListener('input', (event) => {
  if (event.target.matches('input[type="number"]')) renderCart();
});
renderCart();


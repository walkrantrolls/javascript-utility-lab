import '../../../src/array/myReduce.js';

const cart = [
  { product: 'Notebook', quantity: 2, unitPrice: 12.5 },
  { product: 'Pen set', quantity: 1, unitPrice: 5.5 },
  { product: 'Desk lamp', quantity: 1, unitPrice: 39 },
];

const total = cart.myReduce(
  (subtotal, item) => subtotal + item.quantity * item.unitPrice,
  0,
);

console.log(total.toFixed(2)); // 69.50

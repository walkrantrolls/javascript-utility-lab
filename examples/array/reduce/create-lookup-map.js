import '../../../src/array/myReduce.js';

const products = [
  { id: 'sku-101', name: 'Notebook', price: 12.5 },
  { id: 'sku-102', name: 'Pen set', price: 5.5 },
  { id: 'sku-103', name: 'Desk lamp', price: 39 },
];

const byId = products.myReduce((lookup, product) => {
  lookup[product.id] = product;
  return lookup;
}, Object.create(null));

console.log(byId['sku-102']); // { id: 'sku-102', name: 'Pen set', price: 5.5 }

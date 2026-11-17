import '../../../src/array/myReduce.js';

const products = [
  { name: 'Notebook', category: 'Stationery' },
  { name: 'Pen set', category: 'Stationery' },
  { name: 'Desk lamp', category: 'Workspace' },
];

const grouped = products.myReduce((groups, product) => {
  (groups[product.category] ??= []).push(product);
  return groups;
}, Object.create(null));

console.log(JSON.stringify(grouped, null, 2));

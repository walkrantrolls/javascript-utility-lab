import '../../../src/array/myReduce.js';

const values = [1, 2, 3, 4];
const total = values.myReduce((sum, value) => sum + value, 0);
console.log(total); // 10

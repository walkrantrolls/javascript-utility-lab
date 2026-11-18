import '../../../src/array/myReduce/myReduce.js';

const groups = [[1, 2], [3], [4, 5]];
const flattened = groups.myReduce((result, group) => {
  result.push(...group);
  return result;
}, []);

console.log(flattened); // [1, 2, 3, 4, 5]

import flatten from "../../../src/arrays/flatten/flatten.js";

const categoryIds = [
  ["audio", ["headphones", "speakers"]],
  ["office", ["keyboards", "mice"]],
];

const searchableCategoryIds = flatten(categoryIds);
console.log(searchableCategoryIds);
// ["audio", "headphones", "speakers", "office", "keyboards", "mice"]

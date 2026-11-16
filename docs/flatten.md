# Flatten

This self-contained module includes the flatten implementation, its tests, this guide, and an interactive depth control.

## 1. Problem statement
Nested arrays from grouped form fields, category trees, or imported records may need to become a simple list before processing.

## 2. Conceptual explanation
Flattening walks nested arrays and copies their elements into a new array, expanding only to a requested depth. Depth 1 removes one nesting level; `Infinity` removes all nesting.

## 3. Implementation
See [`flatten.js`](../src/arrays/flatten/flatten.js). A depth-first recursive visitor appends scalars and recurses into arrays while remaining depth is positive. It never mutates the input.

## 4. Step-by-step execution
For `[[1, 2], [3, [4, 5]]]` at depth 1: (1) visit the outer elements; (2) recurse one level into each child array; (3) append 1, 2, and 3; (4) keep `[4, 5]` nested because the depth budget is exhausted.

## 5. Edge cases
Depth zero returns a shallow copy. Negative, fractional, or non-finite depths other than `Infinity` throw. Non-array input throws. Sparse holes are visited as `undefined` by this implementation; cyclic arrays are unsupported and may recurse indefinitely.

## 6. Unit tests
[`flatten.test.js`](../src/arrays/flatten/flatten.test.js) covers finite/infinite/zero depth, non-mutation, and invalid inputs. Run with `npm test`.

## 7. Real-world demonstration
The [category ID demo](../playground/index.html#flatten) lets you adjust flattening depth and see the resulting array.

## 8. Complexity analysis
For n visited elements, time is O(n); output space is O(n). Call-stack usage is O(d), where d is the deepest traversed nesting level.

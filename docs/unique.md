# Unique values

## 1. Problem statement
Lists of tags, selected filters, or imported IDs can contain duplicates. Downstream rendering and aggregation often need each value only once.

## 2. Conceptual explanation
A Set records whether a value has already appeared. Converting the input into a Set and back to an array removes duplicates while preserving first-seen order.

## 3. Implementation
See [`unique.js`](../src/arrays/unique.js). It validates the input array and returns `[...new Set(input)]`, using JavaScript Set's SameValueZero equality.

## 4. Step-by-step execution
For `['sale', 'new', 'sale']`: (1) insert `sale`; (2) insert `new`; (3) the second `sale` is already present; (4) convert the ordered Set back to `['sale', 'new']`.

## 5. Edge cases
The original array is unchanged. `NaN` values collapse together, and `0`/`-0` are treated as equal. Objects are compared by reference, not by their properties. Non-array inputs throw.

## 6. Unit tests
[`unique.test.js`](../src/arrays/unique.test.js) covers order, SameValueZero, object identity, non-mutation, and invalid input. Run with `npm test`.

## 7. Real-world demonstration
The [tag deduplication demo](../playground/index.html#unique) lets you edit a list and see the stable unique values.

## 8. Complexity analysis
Expected time is O(n) and additional space is O(n) for n input values.

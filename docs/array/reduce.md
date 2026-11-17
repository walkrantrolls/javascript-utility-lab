# Array.prototype.myReduce

This module reimplements the native array reducer as a non-enumerable Array.prototype method. Its examples, test suite, and interactive demos are kept in separate folders.

## 1. Problem statement

Collections often need to become one result: an order subtotal, a set of products grouped by category, or a fast lookup object indexed by product ID. A reducer carries a result forward as each item is processed.

## 2. What is reduce()?

Native reduce() is an array method that processes present elements from left to right and returns one accumulated value. The value can be a number, object, array, Map, or another type. This implementation adds the separate method Array.prototype.myReduce without calling native reduce() internally.

## 3. How does the accumulator work?

The accumulator is the state returned by one callback invocation and passed into the next. For a sum starting at 0, the values 1, 2, 3, and 4 produce the progression 0 → 1 → 3 → 6 → 10. The accumulator is not automatically a copy: when it is an object or array, the callback decides whether to mutate it or return a new value.

## 4. The four callback arguments

For every present element processed, the callback receives:

1. accumulator — the value carried from the prior step.
2. currentValue — the current present array element.
3. currentIndex — its numeric index.
4. array — the original array-like object being reduced.

The callback return becomes the next accumulator. When there is no initial value, the first present element becomes the accumulator and the callback starts at the following present index.

## 5. Initial value: provided or omitted

When an initial value is provided, it is the starting accumulator and the callback visits each present element. An explicit undefined is still a provided initial value.

When it is omitted, the first present element becomes the starting accumulator. Therefore, a one-element array returns that element without calling the callback. An empty array or an array with only holes throws TypeError when the initial value is omitted. Passing an initial value makes empty input well-defined.

## 6. Sparse arrays

A sparse hole is an absent property, not a value equal to undefined. Like native reduce(), myReduce checks whether each index exists and skips missing slots. Inherited numeric properties are included because the implementation uses the in operator. Explicitly stored undefined values are visited.

## 7. Implementation internals

See [myReduce.js](../../src/array/myReduce.js). It first rejects a nullish receiver, converts the receiver to an object, snapshots its length using ToLength-like rules, and checks the callback. It then either uses the supplied initial value or searches for the first present index. The loop checks index presence and calls the callback with all four arguments. Callback errors propagate unchanged. Object.defineProperty installs the method as writable and configurable but non-enumerable, matching native prototype-method visibility.

The implementation is generic over array-like receivers, as the native method is. It does not use Array.prototype.reduce.

## 8. When to use reduce(), map(), or filter()

Use map() when every input item should become one corresponding output item. Use filter() when you only need to keep or discard items. Use reduce() when the result has a different shape or combines many inputs into one value or structure. If map() or filter() expresses the task more directly, prefer that clearer method.

## 9. Practical examples

- [Calculate a shopping cart total](../../examples/array/reduce/calculate-cart-total.js) by adding each quantity-weighted line total.
- [Group products by category](../../examples/array/reduce/group-by-category.js) into an object whose values are product lists.
- [Create a lookup map](../../examples/array/reduce/create-lookup-map.js) keyed by product ID.
- [Sum numbers](../../examples/array/reduce/basic-sum.js) from an explicit starting value.
- [Flatten one level](../../examples/array/reduce/flatten-array.js) by appending each nested group into an output accumulator.

The [interactive playground](../../playground/reduce/index.html) includes the sum walkthrough and live cart, grouping, and lookup demonstrations.

## 10. Edge cases and tests

The [tests](../../tests/array/myReduce.test.js) verify explicit and missing initial values, multiplication, empty and single-element arrays, explicit undefined, sparse holes, all four callback arguments, thrown callback errors, generic array-like receivers, and prototype property descriptors. Run them with npm test.

## 11. Complexity analysis

For an array-like object with n positions, time complexity is O(n), including sparse positions checked. The reducer adds O(1) auxiliary space, excluding any object or array returned or mutated by the callback.

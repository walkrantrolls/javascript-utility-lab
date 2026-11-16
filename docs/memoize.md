# Memoize

Implementation, unit tests, documentation, and demo for result caching live with this module.

## 1. Problem statement
Pure calculations may repeat the same expensive work. Recursive Fibonacci is a familiar example: naive recursion recomputes overlapping subproblems many times.

## 2. Conceptual explanation
Memoization stores a function result by its arguments. A later call with the same argument tuple returns the cached value instead of running the calculation again.

## 3. Implementation
See [`memoize.js`](../src/functions/memoize/memoize.js). Nested Maps represent argument tuples without stringifying keys. A dedicated result key distinguishes a cached `undefined` from a cache miss. The returned wrapper exposes `clear()`.

## 4. Step-by-step execution
For `memoizedFib(40)`: (1) the first call recursively computes smaller values; (2) each completed call stores its result; (3) overlapping branches find those values in the Map; (4) a later call for 40 returns its cached result immediately.

## 5. Edge cases
Object arguments are keyed by reference identity, not deep value. Only deterministic functions are safe to memoize; results depending on time or external state become stale. The cache grows until `clear()` and can retain arguments and results. Receiver identity is not part of the key.

## 6. Unit tests
[`memoize.test.js`](../src/functions/memoize/memoize.test.js) checks cache hits, type-sensitive keys, cached `undefined`, and cache clearing. Run with `npm test`.

## 7. Real-world demonstration
The [Fibonacci demo](../playground/index.html#memoize) runs the same calculation again and displays the cached-call time.

## 8. Complexity analysis
A lookup/insertion is O(k) for k arguments, plus the underlying computation on a miss. Cache space is proportional to the number of distinct argument paths and retained results.

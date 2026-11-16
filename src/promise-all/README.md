# Promise.all (`promiseAll`)

Implementation, tests, documentation, and a request coordination demo are grouped as one module.

## 1. Problem statement
A dashboard may need profile, order history, and recommendations before it can show a complete view. Independent requests should run concurrently, with results matched to their original inputs.

## 2. Conceptual explanation
The Promise.all pattern adopts promises and plain values, waits until all fulfill, and returns fulfillment values in input order. It rejects as soon as one input rejects.

## 3. Implementation
See [`promise-all.js`](../promise-all/promise-all.js). It materializes the iterable, resolves each item with `Promise.resolve`, stores fulfillment values at their input indexes, and counts remaining results.

## 4. Step-by-step execution
For three requests with delays 350, 700, and 520 ms: (1) start all requests without awaiting each one; (2) each result fills its own index when ready; (3) the completion counter reaches zero after the slowest request; (4) the combined promise resolves with values in original order.

## 5. Edge cases
An empty iterable resolves to an empty array. Non-iterables reject. Rejection does not cancel other operations. Values and thenables are adopted through `Promise.resolve`. Iterator errors reject the returned promise.

## 6. Unit tests
[`promise-all.test.js`](../promise-all/promise-all.test.js) covers order under out-of-order completion, mixed values/promises, empty and general iterables, and rejection. Run with `npm test`.

## 7. Real-world demonstration
The [dashboard request demo](../../playground/index.html#promise-all) simulates three independent requests and updates the view when all complete.

## 8. Complexity analysis
For n inputs, materialization, setup, and result collection are O(n) time and O(n) result storage. The input operations proceed concurrently; this helper does not cancel them after rejection and omits native species-constructor semantics.

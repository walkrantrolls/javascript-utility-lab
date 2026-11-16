# Promise.race (`promiseRace`)

## 1. Problem statement
Some workflows should use whichever operation settles first, such as racing a fast cache against a slower network request or enforcing a timeout.

## 2. Conceptual explanation
A race settles with the first input promise to fulfill or reject. Other operations keep running, but their later outcomes do not change the result.

## 3. Implementation
See [`promiseRace.js`](../src/promises/promiseRace.js). It materializes any iterable, adopts each item with `Promise.resolve`, and wires each settlement to the outer promise.

## 4. Step-by-step execution
For two endpoints: (1) start both requests; (2) each completion competes to settle the wrapper; (3) the first result wins; (4) the slower request is not cancelled.

## 5. Edge cases
Plain values are adopted as already-fulfilled promises. A rejection can win the race. An empty iterable stays pending forever, matching native `Promise.race`. Iterator errors reject.

## 6. Unit tests
[`promiseRace.test.js`](../src/promises/promiseRace.test.js) covers first fulfillment, first rejection, plain values, invalid iterables, and the empty case. Run with `npm test`.

## 7. Real-world demonstration
The [request race demo](../playground/index.html#promise-race) compares request latency and shows the first response.

## 8. Complexity analysis
For n inputs, setup is O(n) time and O(n) promise handlers. The result settles as soon as the first adopted input settles.

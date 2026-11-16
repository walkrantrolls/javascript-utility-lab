# Debounce

Each utility is a self-contained learning module: implementation, unit tests, this guide, and its runnable example are linked below.

## 1. Problem statement
A search field emits an event for every keystroke. Filtering a large catalog or requesting results on every event wastes work and can overwhelm a service.

## 2. Conceptual explanation
Debounce waits for activity to stop. Every call resets a timer; only the most recent call runs after the quiet period. It is useful when intermediate states do not matter and the final input does.

## 3. Implementation
See [`debounce.js`](../debounce/debounce.js). The returned wrapper closes over a timer, clears it on each call, then schedules `fn` with the latest arguments and receiver. The API is trailing-only.

## 4. Step-by-step execution
For calls `search("w")`, `search("wi")`, `search("wire")` 100 ms apart with a 400 ms delay: (1) each call clears the previous timer; (2) the third call schedules a fresh timer; (3) after 400 ms of silence, one callback runs with `"wire"`.

## 5. Edge cases
A zero delay still schedules through the event loop. A continuous stream can postpone the callback indefinitely. Invalid callbacks and negative or non-finite delays throw. There is no cancellation, flush, leading-edge, or promise behavior.

## 6. Unit tests
[`debounce.test.js`](../debounce/debounce.test.js) covers burst coalescing/latest arguments, receiver preservation, and invalid inputs. Run all modules with `npm test`.

## 7. Real-world demonstration
The [live catalog search](../../playground/index.html#debounce) shows matching products and the number of searches actually sent while typing.

## 8. Complexity analysis
Each event does O(1) timer work. The wrapper retains O(1) state (one timer and the latest call's arguments) until invocation.

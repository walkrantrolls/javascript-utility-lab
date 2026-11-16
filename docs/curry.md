# Curry

This folder is the complete curry learning module: implementation, tests, guide, and a live example.

## 1. Problem statement
UI flows often reuse a function with some arguments already known, such as a configured greeting, logger, or currency formatter.

## 2. Conceptual explanation
Currying transforms a function of several arguments into a sequence of calls that collect those arguments. Calls may provide one argument at a time or several at once; invocation happens when the configured arity is reached.

## 3. Implementation
See [`curry.js`](../src/functions/curry.js). `collect` returns a wrapper that appends new arguments to the accumulated list, then either invokes the original function or returns another collector.

## 4. Step-by-step execution
For `curry((greeting, name) => ...)("Hello")("Priya")`: (1) initial arity is two; (2) first call stores `"Hello"` and returns a partial function; (3) second call reaches arity; (4) the original function receives both arguments.

## 5. Edge cases
Functions with default parameters need explicit arity because `Function.length` stops before the first default. Extra arguments are passed through. Placeholders are unsupported. The eventual call receiver is the receiver of the final curried call. Invalid functions or arities throw.

## 6. Unit tests
[`curry.test.js`](../src/functions/curry.test.js) covers different argument groupings, explicit arity, and invalid inputs. Run with `npm test`.

## 7. Real-world demonstration
The [greeting example](../playground/index.html#curry) preconfigures the greeting phrase, then lets you supply a name.

## 8. Complexity analysis
For arity n, argument collection and invocation take O(n) time and partial calls retain O(n) arguments in total. Each partial application creates one closure.

# Throttle

This module groups the implementation, tests, documentation, and interactive example for one concept.

## 1. Problem statement
Scroll, resize, pointer, and telemetry events can arrive faster than useful work can be performed. Processing every event can waste CPU and make interfaces feel sluggish.

## 2. Conceptual explanation
Throttle limits execution frequency. This implementation runs on the leading edge, then coalesces calls during the wait window into one trailing call with the latest arguments. Unlike debounce, regular activity still produces periodic work.

## 3. Implementation
See [`throttle.js`](../src/functions/throttle/throttle.js). A timeout marks the active window. The first call invokes immediately and starts the timeout; suppressed calls replace the saved trailing arguments. At timeout, the latest suppressed call runs if one exists.

## 4. Step-by-step execution
For events A, B, C inside a 180 ms window: (1) A runs immediately; (2) B is saved; (3) C replaces B as the pending value; (4) at the window's end, C runs once. A later event starts a new window.

## 5. Edge cases
A single call has no duplicate trailing invocation. Zero wait follows timer scheduling rules. Invalid functions and negative or non-finite delays throw. This is a leading-plus-trailing policy; leading-only and cancel/flush controls are not included.

## 6. Unit tests
[`throttle.test.js`](../src/functions/throttle/throttle.test.js) verifies the leading call, latest trailing call, a subsequent window, and invalid inputs. Run with `npm test`.

## 7. Real-world demonstration
The [event-stream demo](../playground/index.html#throttle) generates a burst and compares raw events with handled callbacks.

## 8. Complexity analysis
Each incoming event does O(1) work. State is O(1): one timer and at most one pending argument list/receiver.

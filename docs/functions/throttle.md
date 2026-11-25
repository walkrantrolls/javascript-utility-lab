# Throttle

This self-contained module includes the implementation, colocated tests, guide, runnable example, and interactive playground.

## 1. Problem statement

Scroll, resize, pointer, and telemetry events can arrive faster than useful work can be performed. Processing every event wastes CPU and can make interfaces feel sluggish.

## 2. Conceptual explanation

Throttle limits how often a callback can run. This module uses a leading-only policy: the first call runs immediately, then calls are ignored until the wait window ends. Suppressed calls are not queued, and there is no trailing invocation. The wrapper preserves the caller's this value and forwards the arguments from each call that is allowed through.

## 3. Implementation

See [the implementation](../../src/functions/throttle/throttle.js). A closure stores a timer that marks the active window. If there is no timer, the wrapper starts one and invokes func immediately with apply(this, args). Calls made while the timer exists return without invoking func. When the timer expires, the next call can run immediately.

## 4. Step-by-step execution

For events A, B, and C inside a 180 ms window:

1. A arrives while the wrapper is ready, so A runs immediately and starts the timer.
2. B arrives before the timer expires, so it is ignored.
3. C arrives in the same window, so it is also ignored.
4. The timer expires; no callback runs at the trailing edge.
5. The next event after the window starts a new period and runs immediately.

## 5. Edge cases

- The first call is immediate, including when wait is zero.
- With a zero wait, additional synchronous calls are ignored until the timer callback runs.
- Ignored calls do not update the arguments or receiver used by the callback.
- A callback error propagates, while the wait window remains active.
- Invalid callbacks throw TypeError; negative or non-finite waits throw RangeError.
- This API does not expose cancellation, flushing, or trailing behavior.

## 6. Unit tests

[The colocated test file](../../src/functions/throttle/throttle.test.js) covers immediate calls, dropped bursts, no trailing invocation, the next window, this/argument/return-value forwarding, zero wait, and invalid inputs. Run the suite with npm test.

## 7. Real-world demonstration

The [scroll-tracking playground](../../playground/throttle/index.html) compares scroll events with callback executions. Change the wait, scroll the event panel, or generate a rapid event burst. The [runnable scroll example](../../examples/functions/throttle/scroll-tracking.js) shows the same leading-only policy in a small program.

## 8. Complexity analysis

Each call performs O(1) work, and the wrapper stores O(1) state: one timer. The callback's own work is additional to this utility's cost.

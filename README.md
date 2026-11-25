# javascript-utility-lab

A hands-on JavaScript utility library with clean implementations, practical use cases, tests, eight-part guides, and interactive examples.

## Run it

Requires Node.js 20 or newer. The playground is served as native ES modules, so it should not be opened as a `file://` URL.

```sh
npm run dev
```

Then open [http://localhost:4173](http://localhost:4173). No install step is needed to run the app or tests. Optional lint and formatting scripts use the declared ESLint and Prettier development dependencies.

## Utilities

| Utility | Practical example | Implementation |
| --- | --- | --- |
| `debounce` | Wait for a pause in a product search field | [Source](src/functions/debounce/debounce.js), [guide](docs/functions/debounce.md) |
| `throttle` | Bound event handling during a burst of resize-like events | [Source](src/functions/throttle/throttle.js), [guide](docs/throttle.md) |
| `classNames` | Compose conditional UI classes for an adaptive button | [Source](src/functions/classnames/classnames.js), [guide](docs/functions/classnames.md) |
| `curry` | Preconfigure a greeting function for a UI flow | [Source](src/functions/curry/curry.js), [guide](docs/curry.md) |
| `memoize` | Reuse recursive Fibonacci results | [Source](src/functions/memoize/memoize.js), [guide](docs/memoize.md) |
| `flatten` | Normalize nested category ID arrays | [Source](src/arrays/flatten/flatten.js), [guide](docs/array/flatten.md) |
| `myReduce` | Calculate a shopping cart total | [Source](src/array/myReduce/myReduce.js), [guide](docs/array/reduce.md) |
| `promiseAll` | Wait for a set of dashboard requests together | [Source](src/promises/promiseAll/promiseAll.js), [guide](docs/promise-all.md) |
| `promiseRace` | Use the first completed request | [Source](src/promises/promiseRace/promiseRace.js), [guide](docs/promise-race.md) |
| `unique` | Remove duplicate category tags | [Source](src/arrays/unique/unique.js), [guide](docs/unique.md) |
| `deepClone` | Edit a copy of nested settings | [Source](src/objects/deepClone/deepClone.js), [guide](docs/deep-clone.md) |

## Test

```sh
npm test
```

Tests use Node's built-in `node:test` and `node:assert`, with no test framework dependency. `npm run test:watch` reruns them during development.

## Project layout

```text
src/functions/<name>/  Function implementation and matching unit test
examples/array/reduce/ Practical reduce examples
examples/array/flatten/ Runnable nested-array example
examples/functions/<name>/ Runnable function examples
src/array/<name>/        Array utility implementation and co-located test
docs/array/             Array utility engineering guides
docs/functions/        Function utility engineering guides
src/promises/<name>/   Promise implementation and matching unit test
src/arrays/<name>/     Array implementation and matching unit test
src/objects/<name>/    Object implementation and matching unit test
playground/          Browser-native interactive demos for debounce, myReduce, classNames, and flatten
docs/                Mirrored guides for convenient documentation browsing
.github/workflows/   CI runs the unit suite on Node 20
```

## Engineering notes

- Utilities validate their public inputs and keep browser concerns out of the source modules.
- Debounce uses a trailing invocation and preserves the receiver and latest arguments.
- Throttle invokes at the start of a window and coalesces suppressed calls into one trailing invocation.
- Memoization uses a nested `Map` cache keyed by argument identity; call `clear()` to release cached results.
- `flatten` recursively flattens all levels by default and accepts an optional finite non-negative integer depth or `Infinity`.
- `Array.prototype.myReduce` follows the native reducer behavior for initial values, callback arguments, and sparse arrays.
- `promiseAll` accepts any iterable, preserves input order, resolves empty iterables, and rejects on the first rejection.
- `promiseRace` settles with the first result and leaves an empty iterable pending.
- `unique` keeps first-seen order using Set equality.
- `deepClone` preserves cycles for supported plain and built-in data structures.
- The playground uses local in-memory sample data and simulated request latency; it makes no network requests.

## Known scope limits

This is an educational implementation, not a drop-in replacement for every edge case in the platform APIs. In particular, memoized object arguments use reference identity, and the throttle keeps one latest trailing call per window. The browser demo is intentionally static and does not require a framework or bundler.

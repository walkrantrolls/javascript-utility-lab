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
| `debounce` | Wait for a pause in a product search field | [Source](src/functions/debounce.js), [guide](docs/debounce.md) |
| `throttle` | Bound event handling during a burst of resize-like events | [Source](src/functions/throttle.js), [guide](docs/throttle.md) |
| `curry` | Preconfigure a greeting function for a UI flow | [Source](src/functions/curry.js), [guide](docs/curry.md) |
| `memoize` | Reuse recursive Fibonacci results | [Source](src/functions/memoize.js), [guide](docs/memoize.md) |
| `flatten` | Normalize nested category ID arrays | [Source](src/arrays/flatten.js), [guide](docs/flatten.md) |
| `promiseAll` | Wait for a set of dashboard requests together | [Source](src/promises/promiseAll.js), [guide](docs/promise-all.md) |
| `promiseRace` | Use the first completed request | [Source](src/promises/promiseRace.js), [guide](docs/promise-race.md) |
| `unique` | Remove duplicate category tags | [Source](src/arrays/unique.js), [guide](docs/unique.md) |
| `deepClone` | Edit a copy of nested settings | [Source](src/objects/deepClone.js), [guide](docs/deep-clone.md) |

## Test

```sh
npm test
```

Tests use Node's built-in `node:test` and `node:assert`, with no test framework dependency. `npm run test:watch` reruns them during development.

## Project layout

```text
src/functions/       Function utilities and colocated unit tests
src/promises/        Promise utilities and colocated unit tests
src/arrays/          Array utilities and colocated unit tests
src/objects/         Object utilities and colocated unit tests
playground/          Browser-native interactive demos for all nine modules
docs/                Mirrored guides for convenient documentation browsing
.github/workflows/   CI runs the unit suite on Node 20
```

## Engineering notes

- Utilities validate their public inputs and keep browser concerns out of the source modules.
- Debounce uses a trailing invocation and preserves the receiver and latest arguments.
- Throttle invokes at the start of a window and coalesces suppressed calls into one trailing invocation.
- Memoization uses a nested `Map` cache keyed by argument identity; call `clear()` to release cached results.
- `flatten` is non-mutating and accepts finite non-negative integer depths or `Infinity`.
- `promiseAll` accepts any iterable, preserves input order, resolves empty iterables, and rejects on the first rejection.
- `promiseRace` settles with the first result and leaves an empty iterable pending.
- `unique` keeps first-seen order using Set equality.
- `deepClone` preserves cycles for supported plain and built-in data structures.
- The playground uses local in-memory sample data and simulated request latency; it makes no network requests.

## Known scope limits

This is an educational implementation, not a drop-in replacement for every edge case in the platform APIs. In particular, memoized object arguments use reference identity, and the throttle keeps one latest trailing call per window. The browser demo is intentionally static and does not require a framework or bundler.

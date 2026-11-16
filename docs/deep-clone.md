# Deep clone

## 1. Problem statement
An editor often needs to let someone try changes to a nested settings object without mutating the original state until they choose to save.

## 2. Conceptual explanation
A deep clone recursively copies nested values. A `WeakMap` remembers objects already visited, preserving cycles and shared references rather than recursing forever or duplicating shared nodes.

## 3. Implementation
See [`deepClone.js`](../src/objects/deepClone.js). It copies arrays, plain objects, `Date`, `RegExp`, `Map`, and `Set`, and redefines own property descriptors with cloned data values. Unsupported built-ins throw.

## 4. Step-by-step execution
For a profile with nested preferences: (1) allocate a new root; (2) remember source-to-copy in the `WeakMap`; (3) recursively clone each property; (4) return the copy so edits remain separate.

## 5. Edge cases
Cycles and repeated references are preserved. Functions and primitives are returned unchanged. Custom class instances, promises, weak collections, DOM nodes, and other unsupported built-ins throw rather than pretending to clone internal state.

## 6. Unit tests
[`deepClone.test.js`](../src/objects/deepClone.test.js) covers nested structures, independent references, cycles, shared references, common built-ins, and unsupported values. Run with `npm test`.

## 7. Real-world demonstration
The [settings copy demo](../playground/index.html#deep-clone) clones a profile draft before applying edits.

## 8. Complexity analysis
For v reachable supported values and p own properties, the traversal takes O(v + p) time and O(v) extra memory for the clone and `WeakMap`.

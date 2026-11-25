# Flatten

This self-contained module includes its implementation, tests, guide, runnable example, and interactive playground.

## 1. Problem statement

Nested arrays often come from category trees, grouped form fields, product metadata, or imported API records. Many tasks need a flat list of every leaf value before filtering or rendering.

## 2. Conceptual explanation

Flatten traverses arrays depth first and copies each value into a new output array. By default, it recursively expands every nested array. An optional depth argument limits how many levels to expand: depth 0 keeps nested arrays intact, depth 1 expands one level, and Infinity expands all levels. The input is not mutated.

## 3. Implementation

See [the implementation](../../src/array/flatten/flatten.js). The function validates the input and depth, then a recursive visitor walks each item. It descends into an array while the remaining depth is positive; otherwise, it appends the item to the output. The default export matches the common flatten(arr) API, and a named export remains available.

## 4. Step-by-step execution

For [["audio", ["headphones", "speakers"]], ["office", ["keyboards"]]] with the default depth:

1. Start at the outer array.
2. Visit its first child array and descend into it.
3. Append "audio"; descend into its nested array and append "headphones" and "speakers".
4. Visit the second child array, then append "office" and "keyboards".
5. Return ["audio", "headphones", "speakers", "office", "keyboards"].

## 5. Edge cases

- A non-array input throws TypeError.
- Negative, fractional, or invalid infinite depths throw RangeError; Infinity is supported.
- Depth 0 returns a shallow copy, including nested arrays.
- Sparse slots are observed by for...of as undefined and are included in the result.
- Empty arrays contribute no values when they are expanded.
- The input is never mutated.
- Cyclic arrays are not supported and would recurse indefinitely.

## 6. Unit tests

[The colocated test file](../../src/array/flatten/flatten.test.js) covers full recursive flattening, finite and infinite depths, shallow copying, sparse arrays, validation, and both exports. Run the suite with npm test.

## 7. Real-world demonstration

The [flatten playground](../../playground/flatten/index.html) includes presets for product categories, grouped form fields, and paginated API results. Choose a depth, edit the JSON input, and compare the before/after arrays with a traversal trace. A runnable [category example](../../examples/array/flatten/flatten-category-ids.js) is also available.

## 8. Complexity analysis

For n visited values, traversal takes O(n) time. The output requires O(n) space. Recursive traversal uses O(d) call-stack space, where d is the deepest expanded nesting level.

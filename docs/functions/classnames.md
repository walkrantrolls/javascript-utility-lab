# classNames

## 1. Problem statement
UI classes depend on component state. A button may be primary, loading, disabled, and full width. Nested ternaries or string concatenation make these conditions difficult to scan.

## 2. Conceptual explanation
classNames combines supported values into a space-separated string. Strings and non-zero numbers are included. For objects, an own enumerable string key is included when its value is truthy. Arrays can contain any supported value and are traversed recursively. Falsy inputs such as false, null, undefined, 0, and the empty string are ignored. The helper is framework independent; React can use the result as className, and browser code can assign it to element.className.

## 3. Implementation
src/functions/classnames/classnames.js walks the input values. It appends strings and numbers, recursively visits arrays, and selects truthy keys from objects. It joins the selected names with spaces, without mutating inputs or removing duplicates.

## 4. Step-by-step execution
For classNames("button", { "button--primary": true, "is-disabled": false }, ["is-loading"]):
1. "button" is appended.
2. "button--primary" is appended because its flag is truthy; "is-disabled" is skipped.
3. The array contributes "is-loading".
4. The result is "button button--primary is-loading".

## 5. Edge cases
- No supported values return an empty string.
- Empty arrays add nothing; nested arrays are traversed recursively.
- Inherited object properties are skipped.
- Duplicate names remain.
- Functions, symbols, and unsupported values are ignored.
- Circular arrays are outside the supported input.

## 6. Unit tests
classnames.test.js covers mixed inputs, condition flags, nested arrays, falsy values, own enumerable keys, ordering, duplicates, immutability, ignored types, and empty input. Run the suite with npm test.

## 7. Real-world demonstration
playground/classnames/index.html demonstrates an adaptive action button with controls for primary styling, loading, disabled state, and width. The rendered button and generated class string update together. See ../../examples/functions/classnames/button-classes.js for the small reusable example.

## 8. Complexity analysis
Let n be the total number of visited array entries and object keys, k the number of included names, and d the deepest nested array depth. Traversal takes O(n) time. The returned string and collected names use O(k) space; recursive traversal uses O(d) call-stack space.

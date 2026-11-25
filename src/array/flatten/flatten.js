/** Flatten nested arrays to the requested depth (Infinity flattens all levels). */
export default function flatten(input, depth = Infinity) {
  if (!Array.isArray(input)) throw new TypeError('input must be an array');
  if (!(depth === Infinity || (Number.isInteger(depth) && depth >= 0))) {
    throw new RangeError('depth must be a non-negative integer or Infinity');
  }

  const output = [];
  function visit(items, remaining) {
    for (const item of items) {
      if (Array.isArray(item) && remaining > 0) {
        visit(item, remaining === Infinity ? Infinity : remaining - 1);
      } else {
        output.push(item);
      }
    }
  }

  visit(input, depth);
  return output;
}

export { flatten };

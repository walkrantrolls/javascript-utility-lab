/** Cache results by argument identity, including undefined and falsy results. */
export function memoize(fn) {
  if (typeof fn !== 'function') throw new TypeError('fn must be a function');
  const root = new Map();
  const memoized = function (...args) {
    let node = root;
    for (const arg of args) {
      if (!node.has(arg)) node.set(arg, new Map());
      node = node.get(arg);
    }
    if (node.has(memoize.resultKey)) return node.get(memoize.resultKey);
    const result = fn.apply(this, args);
    node.set(memoize.resultKey, result);
    return result;
  };
  memoized.clear = () => root.clear();
  return memoized;
}

memoize.resultKey = Symbol('memoized result');

/** Collect arguments until arity is reached, then invoke fn with the original receiver. */
export function curry(fn, arity = fn.length) {
  if (typeof fn !== 'function') throw new TypeError('fn must be a function');
  if (!Number.isInteger(arity) || arity < 0) throw new RangeError('arity must be a non-negative integer');
  function collect(args, context) {
    return function curried(...next) {
      const all = [...args, ...next];
      const receiver = context ?? this;
      return all.length >= arity ? fn.apply(receiver, all) : collect(all, receiver);
    };
  }
  return collect([], undefined);
}

/** Invoke fn at most once per wait window, retaining the latest call for the trailing edge. */
export function throttle(fn, wait) {
  if (typeof fn !== 'function') throw new TypeError('fn must be a function');
  if (!Number.isFinite(wait) || wait < 0) throw new RangeError('wait must be a non-negative number');

  let timer = null;
  let lastArgs;
  let lastThis;
  return function throttled(...args) {
    if (timer !== null) {
      lastArgs = args;
      lastThis = this;
      return;
    }
    fn.apply(this, args);
    timer = setTimeout(() => {
      timer = null;
      if (lastArgs) {
        const trailingArgs = lastArgs;
        const trailingThis = lastThis;
        lastArgs = lastThis = undefined;
        // A trailing call is useful for stateful events such as resize.
        fn.apply(trailingThis, trailingArgs);
      }
    }, wait);
  };
}

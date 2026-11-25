/** Invoke func immediately, then ignore calls for wait milliseconds. */
export function throttle(func, wait) {
  if (typeof func !== 'function') throw new TypeError('func must be a function');
  if (!Number.isFinite(wait) || wait < 0) {
    throw new RangeError('wait must be a non-negative number');
  }

  let timer = null;
  return function throttled(...args) {
    if (timer !== null) return undefined;

    timer = setTimeout(() => {
      timer = null;
    }, wait);
    return func.apply(this, args);
  };
}

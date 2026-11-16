/** Delay invoking fn until wait milliseconds have elapsed since the last call. */
export function debounce(fn, wait) {
  if (typeof fn !== 'function') throw new TypeError('fn must be a function');
  if (!Number.isFinite(wait) || wait < 0) throw new RangeError('wait must be a non-negative number');

  let timer;
  return function debounced(...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(context, args), wait);
  };
}

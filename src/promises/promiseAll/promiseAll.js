/** Promise.all implementation preserving input order and rejecting on first failure. */
export function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    let items;
    try {
      items = Array.from(iterable);
    } catch (error) {
      reject(error);
      return;
    }
    if (items.length === 0) {
      resolve([]);
      return;
    }
    const results = new Array(items.length);
    let remaining = items.length;
    items.forEach((item, index) => {
      Promise.resolve(item).then((value) => {
        results[index] = value;
        remaining -= 1;
        if (remaining === 0) resolve(results);
      }, reject);
    });
  });
}

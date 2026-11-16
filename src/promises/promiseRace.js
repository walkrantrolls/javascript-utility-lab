/** Resolve or reject with the first input promise to settle. */
export function promiseRace(iterable) {
  return new Promise((resolve, reject) => {
    let items;
    try {
      items = Array.from(iterable);
    } catch (error) {
      reject(error);
      return;
    }
    for (const item of items) Promise.resolve(item).then(resolve, reject);
  });
}

/** Array.prototype.reduce-style implementation, installed as Array.prototype.myReduce. */
export function myReduce(callback, initialValue) {
  if (this === null || this === undefined) {
    throw new TypeError('Array.prototype.myReduce called on null or undefined');
  }

  const object = Object(this);
  const numberLength = +object.length;
  const length = Number.isNaN(numberLength) || numberLength <= 0
    ? 0
    : Math.min(Math.floor(numberLength), Number.MAX_SAFE_INTEGER);

  if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }

  let index = 0;
  let accumulator;

  if (arguments.length > 1) {
    accumulator = initialValue;
  } else {
    while (index < length && !(index in object)) index += 1;
    if (index >= length) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = object[index];
    index += 1;
  }

  while (index < length) {
    if (index in object) {
      accumulator = callback(accumulator, object[index], index, object);
    }
    index += 1;
  }

  return accumulator;
}

Object.defineProperty(Array.prototype, 'myReduce', {
  configurable: true,
  writable: true,
  value: myReduce,
});

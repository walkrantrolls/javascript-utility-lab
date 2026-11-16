/**
 * Deeply copy arrays, plain objects, Date, RegExp, Map, and Set values.
 * Cycles and shared references are preserved. Unsupported built-in objects throw.
 */
export function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value;
  if (seen.has(value)) return seen.get(value);

  let clone;
  if (value instanceof Date) {
    clone = new Date(value.getTime());
  } else if (value instanceof RegExp) {
    clone = new RegExp(value.source, value.flags);
    clone.lastIndex = value.lastIndex;
  } else if (value instanceof Map) {
    clone = new Map();
    seen.set(value, clone);
    for (const [key, entry] of value) clone.set(deepClone(key, seen), deepClone(entry, seen));
  } else if (value instanceof Set) {
    clone = new Set();
    seen.set(value, clone);
    for (const entry of value) clone.add(deepClone(entry, seen));
  } else if (Array.isArray(value)) {
    clone = new Array(value.length);
  } else {
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new TypeError('deepClone supports arrays, plain objects, Date, RegExp, Map, and Set');
    }
    clone = Object.create(prototype);
  }

  seen.set(value, clone);
  for (const key of Reflect.ownKeys(value)) {
    if (Array.isArray(value) && key === 'length') continue;
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if ('value' in descriptor) descriptor.value = deepClone(descriptor.value, seen);
    Object.defineProperty(clone, key, descriptor);
  }
  return clone;
}

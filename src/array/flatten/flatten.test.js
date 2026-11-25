import test from 'node:test';
import assert from 'node:assert/strict';
import flatten, { flatten as namedFlatten } from './flatten.js';

test('default call recursively flattens every nested level', () => {
  assert.deepEqual(flatten([1, [2, [3, [4]]]]), [1, 2, 3, 4]);
});

test('flatten respects an explicitly requested depth', () => {
  const value = [1, [2, [3, [4]]]];
  assert.deepEqual(flatten(value, 1), [1, 2, [3, [4]]]);
  assert.deepEqual(flatten(value, 2), [1, 2, 3, [4]]);
  assert.deepEqual(flatten(value, Infinity), [1, 2, 3, 4]);
});

test('depth zero returns a shallow copy and leaves input unchanged', () => {
  const value = [[], [1]];
  const result = flatten(value, 0);
  assert.deepEqual(result, value);
  assert.notEqual(result, value);
  assert.deepEqual(value, [[], [1]]);
});

test('preserves sparse array positions as undefined values', () => {
  const sparse = [1, , [3, , 5]];
  assert.deepEqual(flatten(sparse), [1, undefined, 3, undefined, 5]);
});

test('validates input and depth', () => {
  assert.throws(() => flatten('abc'), TypeError);
  assert.throws(() => flatten([], -1), RangeError);
  assert.throws(() => flatten([], 1.5), RangeError);
});

test('keeps default and named exports aligned', () => {
  assert.equal(flatten, namedFlatten);
});

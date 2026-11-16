import test from 'node:test';
import assert from 'node:assert/strict';
import { flatten } from './flatten.js';

test('flatten respects the requested depth', () => {
  const value = [1, [2, [3, [4]]]];
  assert.deepEqual(flatten(value), [1, 2, [3, [4]]]);
  assert.deepEqual(flatten(value, 2), [1, 2, 3, [4]]);
  assert.deepEqual(flatten(value, Infinity), [1, 2, 3, 4]);
});

test('flatten leaves input unchanged and preserves empty arrays at depth zero', () => {
  const value = [[], [1]];
  assert.deepEqual(flatten(value, 0), value);
  assert.deepEqual(value, [[], [1]]);
});

test('flatten validates input and depth', () => {
  assert.throws(() => flatten('abc'), TypeError);
  assert.throws(() => flatten([], -1), RangeError);
});

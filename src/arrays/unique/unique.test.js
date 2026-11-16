import test from 'node:test';
import assert from 'node:assert/strict';
import { unique } from './unique.js';

test('unique preserves first occurrence order', () => {
  assert.deepEqual(unique(['sale', 'new', 'sale', 'popular', 'new']), ['sale', 'new', 'popular']);
});

test('unique uses SameValueZero and object identity', () => {
  const item = {};
  assert.deepEqual(unique([NaN, NaN, 0, -0, item, item]), [NaN, 0, item]);
});

test('unique returns a new array and validates input', () => {
  const input = [1, 1, 2];
  const output = unique(input);
  assert.notEqual(output, input);
  assert.deepEqual(input, [1, 1, 2]);
  assert.throws(() => unique('1,1,2'), TypeError);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { curry } from './curry.js';

test('curry supports grouped and one-at-a-time arguments', () => {
  const add = curry((a, b, c) => a + b + c);
  assert.equal(add(1)(2)(3), 6);
  assert.equal(add(1, 2)(3), 6);
  assert.equal(add(1)(2, 3), 6);
});

test('curry supports explicit arity for default parameters', () => {
  assert.equal(curry((a, b = 2) => a + b, 2)(3)(4), 7);
});

test('curry validates function and arity', () => {
  assert.throws(() => curry(3), TypeError);
  assert.throws(() => curry(() => {}, -1), RangeError);
});

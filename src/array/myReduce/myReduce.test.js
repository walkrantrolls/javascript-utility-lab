import test from 'node:test';
import assert from 'node:assert/strict';
import { myReduce } from './myReduce.js';

test('sums numbers with an initial value', () => {
  assert.equal([1, 2, 3, 4].myReduce((sum, value) => sum + value, 0), 10);
});

test('sums numbers without an initial value', () => {
  assert.equal([1, 2, 3, 4].myReduce((sum, value) => sum + value), 10);
});

test('multiplies array values', () => {
  assert.equal([2, 3, 4].myReduce((product, value) => product * value, 1), 24);
});

test('returns the initial value for an empty array', () => {
  const initialValue = { total: 0 };
  assert.equal([].myReduce((accumulator) => accumulator, initialValue), initialValue);
});

test('throws TypeError for an empty array without an initial value', () => {
  assert.throws(() => [].myReduce((sum, value) => sum + value), TypeError);
});

test('returns the sole element without invoking the callback when no initial value is provided', () => {
  let called = false;
  assert.equal([7].myReduce(() => { called = true; }), 7);
  assert.equal(called, false);
});

test('uses explicit undefined as the initial accumulator', () => {
  let firstAccumulator = 'not called';
  const result = [10].myReduce((accumulator, value) => {
    firstAccumulator = accumulator;
    return (accumulator ?? 0) + value;
  }, undefined);
  assert.equal(firstAccumulator, undefined);
  assert.equal(result, 10);
});

test('skips sparse array slots', () => {
  const values = new Array(4);
  values[1] = 2;
  values[3] = 8;
  const visited = [];
  const sum = values.myReduce((total, value, index) => {
    visited.push(index);
    return total + value;
  }, 0);
  assert.equal(sum, 10);
  assert.deepEqual(visited, [1, 3]);
});

test('passes all four callback arguments', () => {
  const input = [5];
  let received;
  input.myReduce((...args) => {
    received = args;
    return args[0] + args[1];
  }, 0);
  assert.equal(received.length, 4);
  assert.equal(received[0], 0);
  assert.equal(received[1], 5);
  assert.equal(received[2], 0);
  assert.equal(received[3], input);
});

test('propagates errors thrown by the callback', () => {
  const expected = new Error('callback failed');
  assert.throws(() => [1].myReduce(() => { throw expected; }, 0), (error) => error === expected);
});

test('works on array-like objects and skips missing properties', () => {
  const arrayLike = { 0: 'a', 2: 'c', length: 3 };
  assert.equal(myReduce.call(arrayLike, (text, value) => text + value, ''), 'ac');
});

test('installs a non-enumerable prototype method', () => {
  const descriptor = Object.getOwnPropertyDescriptor(Array.prototype, 'myReduce');
  assert.equal(descriptor.value, myReduce);
  assert.equal(descriptor.enumerable, false);
  assert.equal(descriptor.writable, true);
  assert.equal(descriptor.configurable, true);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { throttle } from './throttle.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test('throttle invokes the first call immediately', () => {
  const calls = [];
  const update = throttle((value) => calls.push(value), 30);
  update('first');
  assert.deepEqual(calls, ['first']);
});

test('throttle ignores calls during the wait window without a trailing call', async () => {
  const calls = [];
  const update = throttle((value) => calls.push(value), 25);
  update('first');
  update('second');
  update('third');
  assert.deepEqual(calls, ['first']);
  await sleep(40);
  assert.deepEqual(calls, ['first']);
});

test('throttle accepts a new call after the wait window', async () => {
  const calls = [];
  const update = throttle((value) => calls.push(value), 15);
  update('first');
  await sleep(30);
  update('second');
  assert.deepEqual(calls, ['first', 'second']);
});

test('throttle preserves this, forwards arguments, and returns the callback result', () => {
  const receiver = { id: 'panel-1' };
  const update = throttle(function (position, source) {
    return [this.id, position, source];
  }, 30);
  assert.deepEqual(update.call(receiver, 42, 'scroll'), ['panel-1', 42, 'scroll']);
});

test('zero wait drops synchronous calls until the timer clears the window', async () => {
  const calls = [];
  const update = throttle((value) => calls.push(value), 0);
  update(1);
  update(2);
  assert.deepEqual(calls, [1]);
  await sleep(5);
  update(3);
  assert.deepEqual(calls, [1, 3]);
});

test('throttle rejects invalid functions and wait values', () => {
  assert.throws(() => throttle('nope', 1), TypeError);
  assert.throws(() => throttle(() => {}, -1), RangeError);
  assert.throws(() => throttle(() => {}, Infinity), RangeError);
  assert.throws(() => throttle(() => {}, NaN), RangeError);
});

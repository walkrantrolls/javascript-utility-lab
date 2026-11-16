import test from 'node:test';
import assert from 'node:assert/strict';
import { throttle } from './throttle.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test('throttle runs immediately and coalesces a burst to its latest value', async () => {
  const values = [];
  const update = throttle((value) => values.push(value), 25);
  update(1);
  update(2);
  update(3);
  assert.deepEqual(values, [1]);
  await sleep(35);
  assert.deepEqual(values, [1, 3]);
});

test('throttle starts a new window after the previous window ends', async () => {
  const calls = [];
  const update = throttle((value) => calls.push(value), 15);
  update('first');
  await sleep(30);
  update('second');
  assert.deepEqual(calls, ['first', 'second']);
});

test('throttle rejects invalid inputs', () => {
  assert.throws(() => throttle('nope', 1), TypeError);
  assert.throws(() => throttle(() => {}, Infinity), RangeError);
});

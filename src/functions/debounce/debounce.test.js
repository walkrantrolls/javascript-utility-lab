import test from 'node:test';
import assert from 'node:assert/strict';
import { debounce } from './debounce.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test('debounce invokes once after calls stop, using the latest arguments', async () => {
  const calls = [];
  const later = debounce((value) => calls.push(value), 25);
  later('a');
  later('b');
  later('c');
  await sleep(40);
  assert.deepEqual(calls, ['c']);
});

test('debounced callback preserves its receiver', async () => {
  const subject = { value: 42, read: debounce(function () { return this.value; }, 5) };
  let result;
  subject.read();
  await sleep(15);
  // The callback is invoked with the receiver captured at call time.
  const read = debounce(function () { result = this.value; }, 5);
  read.call(subject);
  await sleep(15);
  assert.equal(result, 42);
});

test('debounce rejects invalid inputs', () => {
  assert.throws(() => debounce(null, 1), TypeError);
  assert.throws(() => debounce(() => {}, -1), RangeError);
});

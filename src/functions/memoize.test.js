import test from 'node:test';
import assert from 'node:assert/strict';
import { memoize } from './memoize.js';

test('memoize reuses cached results for the same argument tuple', () => {
  let calls = 0;
  const double = memoize((value) => { calls += 1; return value * 2; });
  assert.equal(double(4), 8);
  assert.equal(double(4), 8);
  assert.equal(calls, 1);
});

test('memoize distinguishes argument types and caches undefined', () => {
  let calls = 0;
  const read = memoize((value) => { calls += 1; return typeof value === 'number' ? undefined : value; });
  read(1);
  read(1);
  read('1');
  assert.equal(calls, 2);
});

test('memoized functions can clear their cache', () => {
  let calls = 0;
  const fn = memoize(() => ++calls);
  fn(); fn(); fn.clear(); fn();
  assert.equal(calls, 2);
});

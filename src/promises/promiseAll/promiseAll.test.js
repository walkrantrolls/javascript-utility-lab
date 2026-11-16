import test from 'node:test';
import assert from 'node:assert/strict';
import { promiseAll } from './promiseAll.js';

test('promiseAll resolves values in input order', async () => {
  const result = await promiseAll([
    new Promise((resolve) => setTimeout(() => resolve('slow'), 15)),
    Promise.resolve('fast'),
    3,
  ]);
  assert.deepEqual(result, ['slow', 'fast', 3]);
});

test('promiseAll resolves empty iterables and rejects on a rejection', async () => {
  assert.deepEqual(await promiseAll([]), []);
  await assert.rejects(promiseAll([Promise.resolve(1), Promise.reject(new Error('offline'))]), /offline/);
});

test('promiseAll accepts general iterables and rejects non-iterables', async () => {
  assert.deepEqual(await promiseAll(new Set([Promise.resolve(1), 2])), [1, 2]);
  await assert.rejects(promiseAll(null), TypeError);
});

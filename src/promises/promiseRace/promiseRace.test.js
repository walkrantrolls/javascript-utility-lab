import test from 'node:test';
import assert from 'node:assert/strict';
import { promiseRace } from './promiseRace.js';

const delay = (value, ms) => new Promise((resolve) => setTimeout(() => resolve(value), ms));

test('promiseRace settles with the first fulfilled input', async () => {
  assert.equal(await promiseRace([delay('slow', 20), delay('fast', 5)]), 'fast');
});

test('promiseRace rejects when a rejection settles first', async () => {
  await assert.rejects(promiseRace([
    new Promise((_, reject) => setTimeout(() => reject(new Error('offline')), 5)),
    delay('fallback', 20),
  ]), /offline/);
});

test('promiseRace adopts values, rejects non-iterables, and leaves empty input pending', async () => {
  assert.equal(await promiseRace([42]), 42);
  await assert.rejects(promiseRace(null), TypeError);
  let settled = false;
  promiseRace([]).then(() => { settled = true; });
  await delay(null, 5);
  assert.equal(settled, false);
});

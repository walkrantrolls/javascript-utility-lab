import test from 'node:test';
import assert from 'node:assert/strict';
import { deepClone } from './deepClone.js';

test('deepClone copies nested objects and arrays without sharing references', () => {
  const source = { user: { name: 'Rae' }, tags: ['new', 'sale'] };
  const copy = deepClone(source);
  assert.deepEqual(copy, source);
  assert.notEqual(copy.user, source.user);
  assert.notEqual(copy.tags, source.tags);
  copy.user.name = 'Kai';
  assert.equal(source.user.name, 'Rae');
});

test('deepClone preserves cycles, prototypes, and shared references', () => {
  const shared = { value: 1 };
  const source = { left: shared, right: shared };
  source.self = source;
  const copy = deepClone(source);
  assert.equal(copy.self, copy);
  assert.equal(copy.left, copy.right);
  assert.notEqual(copy.left, shared);
});

test('deepClone copies common built-ins and rejects unsupported objects', () => {
  const date = new Date('2024-01-02T03:04:05Z');
  const map = new Map([[{ id: 1 }, new Set(['x'])]]);
  const copy = deepClone({ date, map, pattern: /abc/gi });
  assert.notEqual(copy.date, date);
  assert.equal(copy.date.getTime(), date.getTime());
  assert.notEqual([...copy.map.keys()][0], [...map.keys()][0]);
  assert.notEqual([...copy.map.values()][0], [...map.values()][0]);
  assert.equal(copy.pattern.source, 'abc');
  assert.throws(() => deepClone(Promise.resolve(1)), TypeError);
});

import test from 'node:test';
import assert from 'node:assert/strict';

import { groupBy, getColorFromString, stringToArray } from './utils.js';

test('groupBy', async (t) => {
  await t.test('should group entries by a given key', () => {
    const tasks = [
      { id: 2, group: 1 },
      { id: 1, group: 1 },
      { id: 3, group: 2 },
    ];

    assert.deepStrictEqual(groupBy(tasks, 'group'), {
      1: [
        { id: 2, group: 1 },
        { id: 1, group: 1 },
      ],
      2: [{ id: 3, group: 2 }],
    });
  });

  await t.test('should ignore entries without the given key', () => {
    const tasks = [
      { id: 2, group: 0 },
      { id: 1, group: 0 },
      { id: 3, group: 2 },
      { id: 3, groups: 2 },
    ];

    assert.deepStrictEqual(groupBy(tasks, 'group'), {
      0: [
        { id: 2, group: 0 },
        { id: 1, group: 0 },
      ],
      2: [{ id: 3, group: 2 }],
    });
  });
});

test('getColorFromString', async (t) => {
  await t.test('should return the same color for a same String', () => {
    assert.strictEqual(
      getColorFromString('DrPlop'),
      getColorFromString('DrPlop'),
    );
  });

  await t.test('should return a valid color', () => {
    assert.strictEqual(getColorFromString('important'), '#bf616a');
    assert.strictEqual(getColorFromString('Svelte'), '#ebcb8b');
    assert.strictEqual(getColorFromString('Preact'), '#ebcb8b');
    assert.strictEqual(getColorFromString('Jest'), '#d08770');
  });
});

test('stringToArray', async (t) => {
  const data = [
    ['test', ['test']],
    [' jest', ['jest']],
    ['test, jest', ['test', 'jest']],
    [', jest  ', ['jest']],
    ['', []],
    [undefined, []],
    [' ', []],
  ];

  await Promise.all(
    data.map(([input, expected]) =>
      t.test('should return the right array', () => {
        assert.deepStrictEqual(stringToArray(input), expected);
      }),
    ),
  );
});

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { groupBy, getColorFromString, stringToArray } from './utils.js';

describe('groupBy', () => {
  it('should group entries by a given key', () => {
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

  it('should ignore entries without the given key', () => {
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

describe('getColorFromString', () => {
  it('should return the same color for a same String', () => {
    assert.strictEqual(
      getColorFromString('DrPlop'),
      getColorFromString('DrPlop'),
    );
  });

  it('should return a valid color', () => {
    assert.strictEqual(getColorFromString('important'), '#bf616a');
    assert.strictEqual(getColorFromString('Svelte'), '#ebcb8b');
    assert.strictEqual(getColorFromString('Preact'), '#ebcb8b');
    assert.strictEqual(getColorFromString('Jest'), '#d08770');
  });
});

describe('stringToArray', async () => {
  const data = [
    ['test', ['test']],
    [' jest', ['jest']],
    ['test, jest', ['test', 'jest']],
    [', jest  ', ['jest']],
    ['', []],
    [undefined, []],
    [' ', []],
  ];

  data.map(([input, expected]) =>
    it('should return the right array', () => {
      assert.deepStrictEqual(stringToArray(input), expected);
    }),
  );
});

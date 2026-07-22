import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { getColorFromString, stringToArray } from './utils.js';

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

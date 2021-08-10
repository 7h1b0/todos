import { groupBy, getColorFromString, stringToArray } from './utils';

describe('groupBy', () => {
  it('should group entries by a given key', () => {
    const tasks = [
      { id: 2, group: 1 },
      { id: 1, group: 1 },
      { id: 3, group: 2 },
    ];

    expect(groupBy(tasks, 'group')).toEqual({
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

    expect(groupBy(tasks, 'group')).toEqual({
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
    expect(getColorFromString('DrPlop')).toBe(getColorFromString('DrPlop'));
  });

  it('should return ', () => {
    expect(getColorFromString('important')).toBe('#bf616a');
    expect(getColorFromString('DrPlop')).toBe('#a3be8c');
    expect(getColorFromString('Preact')).toBe('#ebcb8b');
    expect(getColorFromString('Jest')).toBe('#d08770');
  });
});

describe('stringToArray', () => {
  it.each([
    ['test', ['test']],
    [' jest', ['jest']],
    ['test, jest', ['test', 'jest']],
    [', jest  ', ['jest']],
    ['', []],
    ['', []],
    [undefined, []],
  ])('should return the right array', (input, expected) => {
    expect(stringToArray(input)).toEqual(expected);
  });
});

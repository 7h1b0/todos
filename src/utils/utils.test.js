import { groupBy } from './utils';

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

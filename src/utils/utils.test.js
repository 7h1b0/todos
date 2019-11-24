import { formatDate, groupBy, classNames } from './utils';

describe('formatDate', () => {
  it('should format the given timestamp', () => {
    const timestamp = new Date('2018-11-01').getTime();

    expect(formatDate(timestamp)).toBe('01.11.2018');
  });

  it('should ignore the time', () => {
    const timestamp = new Date('2018-01-01T16:45').getTime();

    expect(formatDate(timestamp)).toBe('01.01.2018');
  });
});

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

describe('classNames', () => {
  it('should return an empty string if no args', () => {
    expect(classNames()).toEqual('');
  });

  it('should return given argument', () => {
    expect(classNames('test')).toEqual('test');
  });

  it('should return filter arguments', () => {
    expect(classNames('test', false && 'ignored', true && 'added')).toEqual(
      'test added',
    );
  });
});

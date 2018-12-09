import lolex from 'lolex';
import { formatDate, groupBy, diffByDay, getClassByDiffDay } from '../utils';

describe('Utils', () => {
  describe('formatDate', () => {
    it('should format the given timestamp', () => {
      const timestamp = new Date('2018-01-01').getTime();

      expect(formatDate(timestamp)).toBe('1.1.2018');
    });

    it('should ignore the time', () => {
      const timestamp = new Date('2018-01-01T16:45').getTime();

      expect(formatDate(timestamp)).toBe('1.1.2018');
    });
  });

  describe('diffByDay', () => {
    it('should return the number of days between a given date and now', () => {
      const clock = lolex.install({ now: new Date('2018-08-03T16:00') });
      const timestamp = new Date('2018-08-01T16:00');
      expect(diffByDay(timestamp)).toBe(2);
      clock.uninstall();
    });

    it('should return floor the number of days', () => {
      const clock = lolex.install({ now: new Date('2018-08-03T15:59') });
      const timestamp = new Date('2018-08-01T16:00');
      expect(diffByDay(timestamp)).toBe(1);
      clock.uninstall();
    });
  });

  describe('getClassByDiffDay', () => {
    it('should return young if date is younger than 7 days', () => {
      expect(getClassByDiffDay(0)).toBe('young');
      expect(getClassByDiffDay(7)).toBe('young');
    });

    it('should return old if date is older than 7 days but younger than 14 days', () => {
      expect(getClassByDiffDay(8)).toBe('old');
      expect(getClassByDiffDay(14)).toBe('old');
    });

    it('should return old if date is older than 14 days', () => {
      expect(getClassByDiffDay(31)).toBe('very-old');
    });
  });

  describe('groupBy', () => {
    it('should group entries by a given key', () => {
      const todos = [
        { id: 2, group: 1 },
        { id: 1, group: 1 },
        { id: 3, group: 2 },
      ];

      expect(groupBy(todos, 'group')).toEqual({
        1: [{ id: 2, group: 1 }, { id: 1, group: 1 }],
        2: [{ id: 3, group: 2 }],
      });
    });

    it('should ignore entries without the given key', () => {
      const todos = [
        { id: 2, group: 0 },
        { id: 1, group: 0 },
        { id: 3, group: 2 },
        { id: 3, groups: 2 },
      ];

      expect(groupBy(todos, 'group')).toEqual({
        1: [{ id: 2, group: 0 }, { id: 1, group: 0 }],
        2: [{ id: 3, group: 2 }],
      });
    });
  });
});

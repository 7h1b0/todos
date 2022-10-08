import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import FakeTimers from '@sinonjs/fake-timers';

import {
  addTask,
  removeTask,
  updateTask,
  set,
  ADD,
  REMOVE,
  UPDATE,
  SET,
} from './actions.js';

describe('addTask', () => {
  it('should create a ADD action', () => {
    const date = new Date('2018-08-01T16:00').getTime();
    const clock = FakeTimers.install({ now: date });
    const action = addTask('test', 2, ['tests', 'important'], 1);

    assert.deepStrictEqual(action, {
      type: ADD,
      data: {
        id: date,
        title: 'test',
        categoryId: 2,
        board: 1,
        tags: ['tests', 'important'],
        date: date,
        updatedAt: date,
      },
    });
    clock.uninstall();
  });
});

describe('removeTask', () => {
  it('should create a REMOVE action', () => {
    const action = removeTask(2);

    assert.deepStrictEqual(action, {
      type: REMOVE,
      data: 2,
    });
  });
});

describe('updateTask', () => {
  it('should create a UPDATE action', () => {
    const action = updateTask({ id: 2, title: 'test' });

    assert.deepStrictEqual(action, {
      type: UPDATE,
      data: { id: 2, title: 'test' },
    });
  });
});

describe('set', () => {
  it('should create a SET action', () => {
    const action = set([
      { id: 1, title: 'test' },
      { id: 2, title: 'unit' },
    ]);

    assert.deepStrictEqual(action, {
      type: SET,
      data: [
        { id: 1, title: 'test' },
        { id: 2, title: 'unit' },
      ],
    });
  });
});

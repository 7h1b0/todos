import lolex from 'lolex';
import { addTask, removeTask, updateTask } from '../actions';
import { ADD, REMOVE, UPDATE } from '../actions';

describe('addTask', () => {
  it('should create a ADD action', () => {
    const clock = lolex.install({ now: new Date('2018-08-01T16:00') });
    const action = addTask('test', 2);

    expect(action).toEqual({
      type: ADD,
      data: {
        title: 'test',
        categoryId: 2,
        date: new Date('2018-08-01T16:00').getTime(),
      },
    });
    clock.uninstall();
  });

  it('should create a ADD action with a due date', () => {
    const clock = lolex.install({ now: new Date('2018-08-01T16:00') });
    const action = addTask('test', 2);

    expect(action).toEqual({
      type: ADD,
      data: {
        title: 'test',
        categoryId: 2,
        date: new Date('2018-08-01T16:00').getTime(),
      },
    });
    clock.uninstall();
  });
});

describe('removeTask', () => {
  it('should create a REMOVE action', () => {
    const action = removeTask(2);

    expect(action).toEqual({
      type: REMOVE,
      data: 2,
    });
  });
});

describe('updateTask', () => {
  it('should create a UPDATE action', () => {
    const action = updateTask({ id: 2, title: 'test' });

    expect(action).toEqual({
      type: UPDATE,
      data: { id: 2, title: 'test' },
    });
  });
});

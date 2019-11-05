import lolex from 'lolex';
import { addTask, removeTask, updateTask, addAll } from '../actions';
import { ADD, REMOVE, UPDATE, ADD_ALL } from '../actions';

describe('addTask', () => {
  it('should create a ADD action', () => {
    const clock = lolex.install({ now: new Date('2018-08-01T16:00') });
    const action = addTask('test', 2);

    const date = new Date('2018-08-01T16:00').getTime();
    expect(action).toEqual({
      type: ADD,
      data: {
        id: date,
        title: 'test',
        categoryId: 2,
        date: date,
        updatedAt: date,
      },
    });
    clock.uninstall();
  });

  it('should create a ADD action with a due date', () => {
    const clock = lolex.install({ now: new Date('2018-08-01T16:00') });
    const action = addTask('test', 2);

    const date = new Date('2018-08-01T16:00').getTime();
    expect(action).toEqual({
      type: ADD,
      data: {
        id: date,
        title: 'test',
        categoryId: 2,
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

describe('addAll', () => {
  it('should create a ADD_ALL action', () => {
    const action = addAll([{ id: 1, title: 'test' }, { id: 2, title: 'unit' }]);

    expect(action).toEqual({
      type: ADD_ALL,
      data: [{ id: 1, title: 'test' }, { id: 2, title: 'unit' }],
    });
  });
});

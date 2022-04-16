import {
  addTask,
  removeTask,
  updateTask,
  set,
  ADD,
  REMOVE,
  UPDATE,
  SET,
} from './actions';

describe('addTask', () => {
  it('should create a ADD action', () => {
    const date = new Date('2018-08-01T16:00').getTime();
    jest.useFakeTimers('modern').setSystemTime(date);
    const action = addTask('test', 2, ['tests', 'important']);

    expect(action).toEqual({
      type: ADD,
      data: {
        id: date,
        title: 'test',
        categoryId: 2,
        tags: ['tests', 'important'],
        date: date,
        updatedAt: date,
      },
    });
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

describe('set', () => {
  it('should create a SET action', () => {
    const action = set([
      { id: 1, title: 'test' },
      { id: 2, title: 'unit' },
    ]);

    expect(action).toEqual({
      type: SET,
      data: [
        { id: 1, title: 'test' },
        { id: 2, title: 'unit' },
      ],
    });
  });
});
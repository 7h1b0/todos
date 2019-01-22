import addTask from '../addTask';

const add = jest.fn(() => ({ target: { result: 4 } }));
const db = () => ({ add });

describe('#addTask', () => {
  afterEach(() => {
    add.mockClear();
  });

  it('should add a task', async () => {
    const state = { db, tasks: [{ id: 1, title: 'One' }] };

    const updatedTasks = await addTask(state, { title: 'Two' });
    expect(updatedTasks).toEqual({
      tasks: [{ id: 1, title: 'One' }, { id: 4, title: 'Two' }],
    });
  });
});

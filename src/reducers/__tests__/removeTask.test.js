import removeTask from '../removeTask';

const remove = jest.fn();
const db = () => ({ remove });

describe('#removeTask', () => {
  afterEach(() => {
    remove.mockClear();
  });

  it('should remove a task by id', async () => {
    const state = { db, tasks: [{ id: 1 }, { id: 2 }, { id: 3 }] };

    const updatedTasks = await removeTask(state, 2);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(updatedTasks).toEqual({ tasks: [{ id: 1 }, { id: 3 }] });
  });
});

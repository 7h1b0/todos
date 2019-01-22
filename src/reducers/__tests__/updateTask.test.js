import updateTask from '../updateTask';

const edit = jest.fn();
const db = () => ({ edit });

describe('#updateTask', async () => {
  afterEach(() => {
    edit.mockClear();
  });

  it('should updateTask a task by Id', async () => {
    const state = {
      db,
      tasks: [{ id: 1, statusId: 'Todo' }, { id: 2, statusId: 'Todo' }],
    };

    const updatedTasks = await updateTask(state, 2, 'Done');
    expect(updatedTasks).toEqual({
      tasks: [{ id: 1, statusId: 'Todo' }, { id: 2, statusId: 'Done' }],
    });
  });
});

import {
  removeTask,
  addTask,
  updateTask,
  closeModal,
  openModal,
  setStatusId,
} from '../actions';

const remove = jest.fn();
const add = jest.fn(() => ({ target: { result: 4 } }));
const edit = jest.fn();
const db = () => ({ remove, add, edit });

describe('Actions', () => {
  afterEach(() => {
    remove.mockClear();
    add.mockClear();
    edit.mockClear();
  });

  describe('#removeTask', () => {
    it('should remove a task by id', async () => {
      const state = { db, tasks: [{ id: 1 }, { id: 2 }, { id: 3 }] };

      const updatedTasks = await removeTask(state, 2);
      expect(remove).toHaveBeenCalledTimes(1);
      expect(updatedTasks).toEqual({ tasks: [{ id: 1 }, { id: 3 }] });
    });
  });

  describe('#addTask', () => {
    it('should add a task', async () => {
      const state = { db, tasks: [{ id: 1, title: 'One' }] };

      const updatedTasks = await addTask(state, { title: 'Two' });
      expect(updatedTasks).toEqual({
        tasks: [{ id: 1, title: 'One' }, { id: 4, title: 'Two' }],
      });
    });
  });

  describe('#updateTask', async () => {
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

  describe('#openModal', () => {
    it('should return a correct object', () => {
      expect(openModal()).toEqual({ modal: true });
    });
  });

  describe('#closeModal', () => {
    it('should return a correct object', () => {
      expect(closeModal()).toEqual({ modal: false });
    });
  });

  describe('#setStatusId', () => {
    it('should return a correct object', () => {
      expect(setStatusId(undefined, 1)).toEqual({ statusId: 1 });
    });
  });
});

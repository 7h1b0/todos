import { removeTask, addTask, updateTask } from '../actions';

describe('Action', () => {
  xdescribe('removeTask', () => {
    it('should remove a task by id', () => {
      const tasks = { tasks: [{ id: 1 }, { id: 2 }, { id: 3 }] };

      const updatedTasks = removeTask(2)(tasks);
      expect(updatedTasks).toEqual({ tasks: [{ id: 1 }, { id: 3 }] });
    });

    it('should returns a new object', () => {
      const tasks = { tasks: [{ id: 1 }] };

      const updatedTasks = removeTask(1)(tasks);
      expect(updatedTasks).not.toBe(tasks);
    });
  });

  xdescribe('addTask', () => {
    it('should add a task', () => {
      const tasks = { tasks: [{ id: 1 }] };

      const updatedTasks = addTask({ tasks }, { id: 3 });
      expect(updatedTasks).toEqual({ tasks: [{ id: 1 }, { id: 3 }] });
    });

    it('should not mutate tasks and return a new object', () => {
      const tasks = { tasks: [{ id: 1 }] };

      const updatedTasks = addTask({ id: 3 })(tasks);
      expect(updatedTasks).not.toBe(tasks);
    });
  });

  xdescribe('updateTask', () => {
    it('should updateTask a task by Id', () => {
      const tasks = {
        tasks: [{ id: 1, name: 'toto' }, { id: 2, name: 'plop' }],
      };

      const updatedTasks = updateTask({ id: 2, name: 'updated' }, 1)(tasks);
      expect(updatedTasks).toEqual({
        tasks: [{ id: 1, name: 'toto' }, { id: 2, name: 'updated' }],
      });
    });

    it('should returns a new object', () => {
      const tasks = {
        tasks: [{ id: 1, name: 'toto' }, { id: 2, name: 'plop' }],
      };

      const updatedTasks = updateTask({ id: 2, name: 'updated' }, 1)(tasks);
      expect(updatedTasks).not.toBe(tasks);
    });
  });
});

import { removeTodo, addTodo, updateTodo } from '../action';

describe('Action', () => {
  describe('removeTodo', () => {
    it('should remove a todo by id', () => {
      const todos = { todos: [{ id: 1 }, { id: 2 }, { id: 3 }] };

      const updatedTodo = removeTodo(2)(todos);
      expect(updatedTodo).toEqual({ todos: [{ id: 1 }, { id: 3 }] });
    });

    it('should returns a new object', () => {
      const todos = { todos: [{ id: 1 }] };

      const updatedTodo = removeTodo(1)(todos);
      expect(updatedTodo).not.toBe(todos);
    });
  });

  describe('addTodo', () => {
    it('should add a todo', () => {
      const todos = { todos: [{ id: 1 }] };

      const updatedTodo = addTodo({ id: 3 })(todos);
      expect(updatedTodo).toEqual({ todos: [{ id: 1 }, { id: 3 }] });
    });

    it('should not mutate todos and return a new object', () => {
      const todos = { todos: [{ id: 1 }] };

      const updatedTodo = addTodo({ id: 3 })(todos);
      expect(updatedTodo).not.toBe(todos);
    });
  });

  describe('updateTodo', () => {
    it('should updateTodo a todo by Id', () => {
      const todos = {
        todos: [{ id: 1, name: 'toto' }, { id: 2, name: 'plop' }],
      };

      const updatedTodo = updateTodo({ id: 2, name: 'updated' }, 1)(todos);
      expect(updatedTodo).toEqual({
        todos: [{ id: 1, name: 'toto' }, { id: 2, name: 'updated' }],
      });
    });

    it('should returns a new object', () => {
      const todos = {
        todos: [{ id: 1, name: 'toto' }, { id: 2, name: 'plop' }],
      };

      const updatedTodo = updateTodo({ id: 2, name: 'updated' }, 1)(todos);
      expect(updatedTodo).not.toBe(todos);
    });
  });
});

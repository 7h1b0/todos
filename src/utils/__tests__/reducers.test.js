import { reduceTasks } from '../reducers';
import { ADD, REMOVE, UPDATE, REPLACE } from '../actions';

describe('reduceTasks', () => {
  describe('REPLACE action', () => {
    it('should replace the state', () => {
      const state = [1];
      const action = { type: REPLACE, data: [2, 3] };
      const newState = reduceTasks(state, action);

      expect(newState).toEqual([2, 3]);
    });
  });

  describe('ADD action', () => {
    it('should add a element to the state', () => {
      const state = [1];
      const action = { type: ADD, data: 2 };
      const newState = reduceTasks(state, action);

      expect(newState).toEqual([1, 2]);
    });
  });

  describe('REMOVE action', () => {
    it('should remove a element from the state', () => {
      const state = [{ id: 1 }];
      const action = { type: REMOVE, data: 1 };
      const newState = reduceTasks(state, action);

      expect(newState).toEqual([]);
    });

    it('should not change the state if id is unknow', () => {
      const state = [{ id: 1 }];
      const action = { type: REMOVE, data: 2 };
      const newState = reduceTasks(state, action);

      expect(newState).toEqual([{ id: 1 }]);
    });
  });

  describe('UPDATE action', () => {
    it('should update a task', () => {
      const state = [{ id: 1, title: 'test' }];
      const action = { type: UPDATE, data: { id: 1, title: 'updatedTest' } };
      const newState = reduceTasks(state, action);

      expect(newState).toEqual([{ id: 1, title: 'updatedTest' }]);
    });

    it('should update a complex state', () => {
      const state = [
        { id: 1, title: 'test' },
        { id: 2, title: 'test' },
        { id: 3, title: 'test' },
      ];
      const action = { type: UPDATE, data: { id: 2, title: 'updatedTest' } };
      const newState = reduceTasks(state, action);

      expect(newState).toEqual([
        { id: 1, title: 'test' },
        { id: 2, title: 'updatedTest' },
        { id: 3, title: 'test' },
      ]);
    });

    it('should not update the state if id is unknow', () => {
      const state = [{ id: 1, title: 'test' }];
      const action = { type: UPDATE, data: { id: 2, title: 'updatedTest' } };
      const newState = reduceTasks(state, action);

      expect(newState).toEqual([{ id: 1, title: 'test' }]);
    });
  });

  it('should not change the state if action.type is unknow', () => {
    const state = [1, 2];
    const action = { type: 'TEST' };
    const newState = reduceTasks(state, action);

    expect(newState).toBe(state);
  });
});

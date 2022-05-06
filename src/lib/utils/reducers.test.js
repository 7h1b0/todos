import test from 'node:test';
import assert from 'node:assert/strict';

import { reduceTasks } from './reducers.js';
import { ADD, REMOVE, UPDATE, SET } from './actions.js';

test('ALL_ALL action', async (t) => {
  await t.test('should add everything to the state', () => {
    const state = [1];
    const action = { type: SET, data: [2, 3] };
    const newState = reduceTasks(state, action);

    assert.deepStrictEqual(newState, [1, 2, 3]);
  });
});

test('ADD action', async (t) => {
  await t.test('should add a element to the state', () => {
    const state = [1];
    const action = { type: ADD, data: 2 };
    const newState = reduceTasks(state, action);

    assert.deepStrictEqual(newState, [1, 2]);
  });
});

test('REMOVE action', async (t) => {
  await t.test('should remove a element from the state', () => {
    const state = [{ id: 1 }];
    const action = { type: REMOVE, data: 1 };
    const newState = reduceTasks(state, action);

    assert.deepStrictEqual(newState, []);
  });

  await t.test('should not change the state if id is unknow', () => {
    const state = [{ id: 1 }];
    const action = { type: REMOVE, data: 2 };
    const newState = reduceTasks(state, action);

    assert.deepStrictEqual(newState, [{ id: 1 }]);
  });
});

test('UPDATE action', async (t) => {
  await t.test('should update a task', () => {
    const state = [{ id: 1, title: 'test' }];
    const action = { type: UPDATE, data: { id: 1, title: 'updatedTest' } };
    const newState = reduceTasks(state, action);

    assert.deepStrictEqual(newState, [{ id: 1, title: 'updatedTest' }]);
  });

  await t.test('should update a complex state', () => {
    const state = [
      { id: 1, title: 'test' },
      { id: 2, title: 'test' },
      { id: 3, title: 'test' },
    ];
    const action = { type: UPDATE, data: { id: 2, title: 'updatedTest' } };
    const newState = reduceTasks(state, action);

    assert.deepStrictEqual(newState, [
      { id: 1, title: 'test' },
      { id: 2, title: 'updatedTest' },
      { id: 3, title: 'test' },
    ]);
  });

  await t.test('should not update the state if id is unknow', () => {
    const state = [{ id: 1, title: 'test' }];
    const action = { type: UPDATE, data: { id: 2, title: 'updatedTest' } };
    const newState = reduceTasks(state, action);

    assert.deepStrictEqual(newState, [{ id: 1, title: 'test' }]);
  });
});

test('should not change the state if action.type is unknow', () => {
  const state = [1, 2];
  const action = { type: 'TEST' };
  const newState = reduceTasks(state, action);

  assert.strictEqual(newState, state);
});

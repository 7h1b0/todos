import { writable } from 'svelte/store';
import { reduceTasks } from '../utils/reducers';
import dispatchMiddleware from '../utils/dispatchMiddleware';
import getDb from '../utils/database';

export const INITIAL_BOARD = { id: 1, title: 'Main' };
export const boards = writable([], async (set) => {
  const db = await getDb('boards');
  const event = await db.findAll();
  set(event.target.result);
});

export const currentBoard = writable(INITIAL_BOARD);

async function dispatch(action) {
  boards.update((state) => reduceTasks(state, action));
}

export default dispatchMiddleware(dispatch, 'boards');

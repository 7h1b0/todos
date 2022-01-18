import { writable, derived } from 'svelte/store';
import { reduceTasks } from './utils/reducers';
import dispatchMiddleware from './utils/dispatchMiddleware';
import { groupBy } from './utils/utils';
import getDb from './utils/database';

export const tasks = writable([], async (set) => {
  const db = await getDb();
  const event = await db.findAll();
  set(event.target.result);
});

async function dispatch(action) {
  tasks.update((state) => reduceTasks(state, action));
}

export default dispatchMiddleware(dispatch);

export const groupedTasks = derived(tasks, ($tasks) =>
  groupBy($tasks, 'categoryId'),
);

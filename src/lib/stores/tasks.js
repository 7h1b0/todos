import { derived, writable } from 'svelte/store';
import { reduceTasks } from '../utils/reducers';
import dispatchMiddleware from '../utils/dispatchMiddleware';
import { groupBy } from '../utils/utils';
import getDb from '../utils/database';
import { search } from './search';
import { currentBoard } from './boards';

export const tasks = writable([], async (set) => {
  const db = await getDb();
  const event = await db.findAll();
  set(event.target.result);
});

async function dispatch(action) {
  tasks.update((state) => reduceTasks(state, action));
}

export default dispatchMiddleware(dispatch, 'tasks');

export const groupedFilteredTasks = derived(
  [currentBoard, search, tasks],
  async ([$currentBoard, $search], set) => {
    const db = await getDb('tasks');
    const event = await db.findAllByIndex('board', $currentBoard.id);
    const tasks = event.target.result;

    const regex = new RegExp($search, 'gi');
    const filteredTasks = tasks.filter((task) =>
      task.tags.some((tag) => regex.test(tag)),
    );
    set(groupBy(filteredTasks, 'categoryId'));
  },
  {},
);

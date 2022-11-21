import { derived } from 'svelte/store';
import { groupBy } from '../utils/utils';
import getDb from '../utils/database';
import { search } from './search';
import { currentBoard } from './boards';
import dbWritable from './dbWritable';

export const tasksStore = dbWritable(async (set) => {
  const db = await getDb();
  const event = await db.findAll();
  set(event.target.result);
}, 'tasks');

export const groupedFilteredTasks = derived(
  [currentBoard, search, tasksStore],
  async ([$currentBoard, $search], set) => {
    const db = await getDb('tasks');
    const event = await db.findAllByIndex('board', $currentBoard.id);
    const tasks = event.target.result;

    const regex = new RegExp($search, 'gi');
    const filteredTasks = tasks.filter((task) => {
      if (task.tags.length > 0) {
        return task.tags.some((tag) => regex.test(tag));
      } else if ($search === '') {
        return true;
      }
      return false;
    });
    set(groupBy(filteredTasks, 'categoryId'));
  },
  {},
);

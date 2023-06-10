import { derived } from 'svelte/store';
import { groupBy } from '../utils/utils';
import getDb from '../utils/database';
import { DONE } from '../utils/categories';
import { search } from './search';
import dbWritable from './dbWritable';

export const tasksStore = dbWritable(async (set) => {
  const db = await getDb();
  const event = await db.findAll();
  set(event.target.result);
}, 'tasks');

export const groupedFilteredTasks = derived(
  [search, tasksStore],
  async ([$search, $tasks], set) => {
    const regex = new RegExp($search, 'gi');
    const filteredTasks = $tasks.filter((task) => {
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

export const progress = derived(tasksStore, ($tasks) => {
  const doneTask = $tasks.filter((task) => DONE.id === task.categoryId);
  return `${(doneTask.length * 100) / $tasks.length}%`;
});

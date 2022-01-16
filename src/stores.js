import { writable } from 'svelte/store';
import { reduceTasks } from './utils/reducers';
import dispatchMiddleware from './utils/dispatchMiddleware';

export const tasksStore = writable([]);

async function dispatch(action) {
  tasksStore.update((state) => reduceTasks(state, action));
}

export default dispatchMiddleware(dispatch);

import getDb from '../utils/database';

export default function dbWritable(start, table) {
  let state = [];
  const subscribers = new Set();

  start(set);

  function set(newState) {
    state = newState;
    subscribers.forEach((subscriber) => subscriber(state));
  }

  return {
    subscribe: (subscription) => {
      subscribers.add(subscription);
      subscription(state);
      return () => subscribers.delete(subscription);
    },
    add: async (action) => {
      const db = await getDb(table);
      await db.add(action);

      set(state.concat(action));
    },
    set: async (action) => {
      const db = await getDb(table);
      await db.set(action);

      set(state.concat(action));
    },
    remove: async (action) => {
      const db = await getDb(table);
      await db.remove(action);

      set(state.filter(({ id }) => id !== action));
    },
    update: async (action) => {
      const db = await getDb(table);
      await db.edit(action);

      const indexTargetTask = state.findIndex(({ id }) => id === action.id);

      if (~indexTargetTask) {
        return set(state.with(indexTargetTask, action));
      }
      set(state);
    },
  };
}

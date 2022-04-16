import getDb from './database';
import { ADD, REMOVE, UPDATE, SET } from './actions';

export default function dispatchMiddleware(dispatch, table = 'tasks') {
  return async (action) => {
    const db = await getDb(table);
    switch (action.type) {
      case SET:
        await db.set(action.data);
        break;
      case ADD:
        await db.add(action.data);
        break;
      case REMOVE:
        await db.remove(action.data);
        break;
      case UPDATE:
        await db.edit(action.data);
        break;
    }
    dispatch(action);
  };
}

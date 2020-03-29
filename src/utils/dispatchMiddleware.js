import getDb from './database';
import { ADD, REMOVE, UPDATE, ADD_ALL } from './actions';

export default function dispatchMiddleware(dispatch) {
  return async (action) => {
    const db = await getDb();
    switch (action.type) {
      case ADD_ALL:
        await db.addAll(action.data);
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

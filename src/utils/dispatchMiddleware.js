import getDb from 'utils/database';
import { ADD, REMOVE, UPDATE, ADD_ALL } from 'utils/actions';

export default function dispatchMiddleware(dispatch) {
  return async action => {
    const db = await getDb();
    switch (action.type) {
      case ADD_ALL:
        await db('tasks').addAll(action.data);
        break;
      case ADD:
        await db('tasks').add(action.data);
        break;
      case REMOVE:
        await db('tasks').remove(action.data);
        break;
      case UPDATE:
        await db('tasks').edit(action.data);
        break;
    }
    dispatch(action);
  };
}

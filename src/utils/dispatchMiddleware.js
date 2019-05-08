import getDb from 'utils/database';
import { ADD, REMOVE, UPDATE } from 'utils/actions';

export default function dispatchMiddleware(dispatch) {
  return async action => {
    const db = await getDb();
    switch (action.type) {
      case ADD:
        const event = await db('tasks').add(action.data);
        action.data.id = event.target.result;
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

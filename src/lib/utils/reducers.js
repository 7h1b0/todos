import { ADD, REMOVE, UPDATE, SET } from './actions';

export function reduceTasks(state, action) {
  switch (action.type) {
    case SET:
    case ADD:
      return state.concat(action.data);
    case REMOVE:
      return state.filter(({ id }) => id !== action.data);
    case UPDATE: {
      const indexTargetTask = state.findIndex(
        ({ id }) => id === action.data.id,
      );
      if (~indexTargetTask) {
        return [
          ...state.slice(0, indexTargetTask),
          action.data,
          ...state.slice(indexTargetTask + 1),
        ];
      }
      return state;
    }
    default:
      return state;
  }
}

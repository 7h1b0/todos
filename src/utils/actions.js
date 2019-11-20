export const REMOVE = 'REMOVE';
export const ADD = 'ADD';
export const UPDATE = 'UPDATE';
export const REPLACE = 'REPLACE';

export function addTask(title, categoryId, date = Date.now()) {
  return {
    type: ADD,
    data: { title, categoryId, date, updatedAt: date },
  };
}

export function removeTask(id) {
  return {
    type: REMOVE,
    data: id,
  };
}

export function updateTask(task) {
  return {
    type: UPDATE,
    data: task,
  };
}

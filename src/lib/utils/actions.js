export const REMOVE = 'REMOVE';
export const ADD = 'ADD';
export const UPDATE = 'UPDATE';
export const SET = 'SET';

export function addTask(title, categoryId, tags, boardId, date = Date.now()) {
  return {
    type: ADD,
    data: {
      id: date,
      title,
      categoryId,
      date,
      updatedAt: date,
      tags,
      board: boardId,
    },
  };
}

export function addBoard(title) {
  return { type: ADD, data: { id: Date.now(), title } };
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

export function set(tasks) {
  return {
    type: SET,
    data: tasks,
  };
}
export function removeTask(idToRemoved) {
  return ({ tasks }) => ({
    tasks: tasks.filter(({ id }) => id !== idToRemoved),
  });
}

export function addTask(task) {
  return ({ tasks }) => ({
    tasks: [...tasks, task],
  });
}

export function updateTask(task, insertAt) {
  return ({ tasks }) => ({
    tasks: [...tasks.slice(0, insertAt), task, ...tasks.slice(insertAt + 1)],
  });
}

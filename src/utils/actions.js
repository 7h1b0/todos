export async function removeTask({ db, tasks }, idToRemoved) {
  await db('tasks').remove(idToRemoved);
  return {
    tasks: tasks.filter(({ id }) => id !== idToRemoved),
  };
}

export async function addTask({ db, tasks }, task) {
  try {
    const event = await db('tasks').add(task);
    task.id = event.target.result;
    return { tasks: [...tasks, task] };
  } catch (error) {
    console.error(error);
  }
}

export async function updateTask({ tasks, db }, targetId, targetStatusId) {
  try {
    const indedTargetTask = tasks.findIndex(({ id }) => id === targetId);
    if (~indedTargetTask) {
      const targetTask = tasks[indedTargetTask];
      const updatedTask = { ...targetTask, statusId: targetStatusId };
      await db('tasks').edit(updatedTask);

      return {
        tasks: [
          ...tasks.slice(0, indedTargetTask),
          updatedTask,
          ...tasks.slice(indedTargetTask + 1),
        ],
      };
    }
  } catch (err) {
    console.log(err);
  }
}

export function openModal() {
  return { modal: true };
}

export function closeModal() {
  return { modal: false };
}

export function setStatusId(_, statusId) {
  return { statusId };
}

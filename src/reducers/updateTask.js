export default async function updateTask(
  { tasks, db },
  targetId,
  targetStatusId,
) {
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

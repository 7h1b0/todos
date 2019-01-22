export default async function removeTask({ db, tasks }, idToRemoved) {
  await db('tasks').remove(idToRemoved);
  return {
    tasks: tasks.filter(({ id }) => id !== idToRemoved),
  };
}

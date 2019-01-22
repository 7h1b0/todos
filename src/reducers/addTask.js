export default async function addTask({ db, tasks }, task) {
  try {
    const event = await db('tasks').add(task);
    task.id = event.target.result;
    return { tasks: [...tasks, task] };
  } catch (error) {
    console.error(error);
  }
}

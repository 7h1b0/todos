export function removeTodo(idToRemoved) {
  return ({ todos }) => ({
    todos: todos.filter(({ id }) => id !== idToRemoved),
  });
}

export function addTodo(todo) {
  return ({ todos }) => ({
    todos: todos.concat([todo]),
  });
}

export function updateTodo(todo, insertAt) {
  return ({ todos }) => ({
    todos: [...todos.slice(0, insertAt), todo, ...todos.slice(insertAt + 1)],
  });
}

export default function getDb() {
  let db = undefined;

  function add(todo) {
    return new Promise((resolve, reject) => {
      const request = db
        .transaction(['todo'], 'readwrite')
        .objectStore('todo')
        .add(todo);

      request.onsuccess = resolve;
      request.onerror = reject;
    });
  }

  function remove(todoId) {
    return new Promise((resolve, reject) => {
      const request = db
        .transaction(['todo'], 'readwrite')
        .objectStore('todo')
        .delete(todoId);
      request.onsuccess = resolve;
      request.onerror = reject;
    });
  }

  function findAll() {
    return new Promise((resolve, reject) => {
      const request = db
        .transaction(['todo'])
        .objectStore('todo')
        .getAll();
      request.onerror = reject;
      request.onsuccess = resolve;
    });
  }

  function edit(todo) {
    return new Promise((resolve, reject) => {
      const request = db
        .transaction(['todo'], 'readwrite')
        .objectStore('todo')
        .put(todo);
      request.onerror = reject;
      request.onsuccess = resolve;
    });
  }

  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('Todos', 3);
    request.onerror = reject;
    request.onsuccess = event => {
      db = event.target.result;
      resolve({
        findAll,
        add,
        remove,
        edit,
      });
    };

    request.onupgradeneeded = event => {
      const db = event.target.result;
      db.createObjectStore('todo', {
        keyPath: 'id',
        autoIncrement: true,
      });
    };
  });
}

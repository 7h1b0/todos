const promisifyRequest = (request) =>
  new Promise((resolve, reject) => {
    request.onsuccess = resolve;
    request.onerror = reject;
  });

export default function getDb(table = 'tasks') {
  let db = undefined;

  const scope = {
    findAllByIndex: (index, id) =>
      promisifyRequest(
        db
          .transaction(table)
          .objectStore(table)
          .index(index)
          .getAll(IDBKeyRange.only(id)),
      ),
    findAll: () =>
      promisifyRequest(db.transaction(table).objectStore(table).getAll()),
    add: (task) =>
      promisifyRequest(
        db.transaction(table, 'readwrite').objectStore(table).add(task),
      ),
    set: (tasks) => {
      return new Promise((resolve, reject) => {
        const tx = db.transaction(table, 'readwrite');

        tasks.forEach((task) => tx.objectStore(table).add(task));
        tx.oncomplete = resolve;
        tx.onerror = reject;
      });
    },
    remove: (id) =>
      promisifyRequest(
        db.transaction(table, 'readwrite').objectStore(table).delete(id),
      ),
    edit: (obj) =>
      promisifyRequest(
        db.transaction(table, 'readwrite').objectStore(table).put(obj),
      ),
  };

  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('Todos', 6);
    request.onerror = reject;
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(scope);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const tasks = db.createObjectStore('tasks', {
        keyPath: 'id',
      });
      tasks.createIndex('board', 'board', { unique: false });
      db.createObjectStore('boards', {
        keyPath: 'id',
      });
    };
  });
}

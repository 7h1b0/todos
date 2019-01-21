export default function getDb() {
  const promisifyRequest = request =>
    new Promise((resolve, reject) => {
      request.onsuccess = resolve;
      request.onerror = reject;
    });

  let db = undefined;

  const scope = table => ({
    findAll: () =>
      promisifyRequest(
        db
          .transaction([table])
          .objectStore(table)
          .getAll(),
      ),
    add: obj =>
      promisifyRequest(
        db
          .transaction([table], 'readwrite')
          .objectStore(table)
          .add(obj),
      ),
    remove: id =>
      promisifyRequest(
        db
          .transaction([table], 'readwrite')
          .objectStore(table)
          .delete(id),
      ),
    edit: obj =>
      promisifyRequest(
        db
          .transaction([table], 'readwrite')
          .objectStore(table)
          .put(obj),
      ),
  });

  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('Todos', 4);
    request.onerror = reject;
    request.onsuccess = event => {
      db = event.target.result;
      resolve(scope);
    };

    request.onupgradeneeded = event => {
      const db = event.target.result;
      db.createObjectStore('tasks', {
        keyPath: 'id',
        autoIncrement: true,
      });
    };
  });
}

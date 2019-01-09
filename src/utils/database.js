export default function getDb() {
  let db = undefined;

  const scope = table => {
    const add = obj =>
      new Promise((resolve, reject) => {
        const request = db
          .transaction([table], 'readwrite')
          .objectStore(table)
          .add(obj);

        request.onsuccess = resolve;
        request.onerror = reject;
      });

    const remove = id =>
      new Promise((resolve, reject) => {
        const request = db
          .transaction([table], 'readwrite')
          .objectStore(table)
          .delete(id);
        request.onsuccess = resolve;
        request.onerror = reject;
      });

    const findAll = () =>
      new Promise((resolve, reject) => {
        const request = db
          .transaction([table])
          .objectStore(table)
          .getAll();
        request.onerror = reject;
        request.onsuccess = resolve;
      });

    const edit = todo =>
      new Promise((resolve, reject) => {
        const request = db
          .transaction([table], 'readwrite')
          .objectStore(table)
          .put(todo);
        request.onerror = reject;
        request.onsuccess = resolve;
      });

    return {
      findAll,
      add,
      remove,
      edit,
    };
  };

  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('Todos', 3);
    request.onerror = reject;
    request.onsuccess = event => {
      db = event.target.result;
      resolve(scope);
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

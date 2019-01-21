export function truncateIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('Todos', 4);
    request.onerror = reject;
    request.onsuccess = event => {
      const db = event.target.result;
      const clear = db
        .transaction(['tasks'], 'readwrite')
        .objectStore('tasks')
        .clear();

      clear.onsuccess = resolve();
      clear.onerror = reject();
    };
  });
}

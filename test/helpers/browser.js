export function truncateIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('Todos', 3);
    request.onerror = reject;
    request.onsuccess = event => {
      const db = event.target.result;
      const clear = db
        .transaction(['todo'], 'readwrite')
        .objectStore('todo')
        .clear();

      clear.onsuccess = resolve();
      clear.onerror = reject();
    };
  });
}

export async function addTodo(page, label) {
  await page.click('.add');
  await page.type('input[type="text"]', label);
  await page.click('.submit');
}

export async function addInProgress(page, label) {
  await page.$$eval('.add', elements => elements[1].click());
  await page.type('input[type="text"]', label);
  await page.click('.submit');
}

export function countTasks(page) {
  return page.$$eval('.task', elements => elements.length);
}

export async function visit(url) {
  const page = await browser.newPage();
  await page.goto(url);
  return page;
}

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

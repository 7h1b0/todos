import {
  addTodo,
  addInProgress,
  countTasks,
  visit,
  truncateIndexedDB,
} from './helper';

describe('e2e', () => {
  let page;

  beforeEach(async () => {
    page = await visit('http://127.0.0.1:3000');
  });

  afterEach(async () => {
    await page.evaluate(truncateIndexedDB);
    await page.close();
  });

  it('should add a task', async () => {
    await addTodo(page, 'Get more sleep');
    await addInProgress(page, 'Make e2e test');

    const labels = await page.$$eval('.title-header', elements =>
      elements.map(el => el.textContent),
    );
    const tasks = await countTasks(page);
    const task = await page.$eval('.young .title', el => el.textContent);

    expect(labels).toEqual(['1Todo', '1In Progress', '0Done']);
    expect(tasks).toBe(2);
    expect(task).toBe('Get more sleep');
  });

  it('should remove a task', async () => {
    await addTodo(page, 'Get more sleep');
    let tasks = await countTasks(page);
    expect(tasks).toBe(1);

    await page.hover('.task');
    await page.click('.delete');

    tasks = await countTasks(page);
    expect(tasks).toBe(0);
  });
});

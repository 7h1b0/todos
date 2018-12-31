import { truncateIndexedDB } from 'browser';
import { addTodo, addInProgress } from 'factories';

describe('e2e', () => {
  beforeEach(async () => {
    await visit('http://127.0.0.1:3000');
  });

  afterEach(async () => {
    if (page) {
      await page.evaluate(truncateIndexedDB);
      await page.close();
    }
  });

  it('should add tasks', async () => {
    await addTodo('Get more sleep');
    await expect(page).toContainText('1Todo');
    await expect(page).toContainText('Get more sleep');

    await expect(page).toContainText('0In Progress');
    await addInProgress('Make e2e test');
    await expect(page).toContainText('1In Progress');
    await expect(page).toContainText('Make e2e test');
    
    await expect(page).toContainText('0Done');
  });
  
  it('should remove a task', async () => {
    await addTodo('Get more sleep');
    await expect(page).toContainText('Get more sleep');
    
    await page.hover('.task');
    await page.click('.delete');
    
    await expect(page).not.toContainText('Get more sleep');
  });
});

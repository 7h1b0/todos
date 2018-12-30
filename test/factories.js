export async function addTodo(label) {
  await page.click('.add');
  await page.type('input[type="text"]', label);
  await page.click('.submit');
}

export async function addInProgress(label) {
  await page.$$eval('.add', elements => elements[1].click());
  await page.type('input[type="text"]', label);
  await page.click('.submit');
}

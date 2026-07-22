/**
 * @param {number} timestamp
 * @returns {string}
 */
export function formatDate(timestamp) {
  return new Intl.DateTimeFormat().format(new Date(timestamp));
}

/**
 * @typedef {{ id: number, title: string, category: number, date: number, updatedAt: number, tags: string[] }} Task
 */

/**
 * @param {Task} taskA
 * @param {Task} taskB
 * @returns {number}
 */
export function sortByUpdated(taskA, taskB) {
  return taskA.updatedAt - taskB.updatedAt;
}

export const COLORS = ['#bf616a', '#d08770', '#ebcb8b', '#a3be8c', '#b48ead'];

/**
 * @param {string} tag
 * @returns {string}
 */
export function getColorFromString(tag) {
  const length = tag.length;
  let score = 0;
  for (let i = 0; i < length; i++) {
    score += tag.charCodeAt(i);
  }

  const index = score % COLORS.length;
  return COLORS[index];
}

/**
 * @param {string} tag
 * @returns {string}
 */
export function stringToArray(input = '') {
  return input
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

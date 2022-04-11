export function formatDate(timestamp) {
  return new Intl.DateTimeFormat().format(new Date(timestamp));
}

export function groupBy(items, key) {
  return items.reduce((result, item) => {
    if (Object.prototype.hasOwnProperty.call(item, key)) {
      result[item[key]] = [...(result[item[key]] || []), item];
    }
    return result;
  }, {});
}

export function getBoardIdFromLocation() {
  const params = new URLSearchParams(document.location.search);
  return params.get('boardId');
}

export function sortByUpdated(taskA, taskB) {
  return taskA.updatedAt - taskB.updatedAt;
}

export const COLORS = ['#bf616a', '#d08770', '#ebcb8b', '#a3be8c', '#b48ead'];
export function getColorFromString(tag) {
  const length = tag.length;
  let score = 0;
  for (let i = 0; i < length; i++) {
    score += tag.charCodeAt(i);
  }

  const index = score % COLORS.length;
  return COLORS[index];
}

export function stringToArray(input = '') {
  return input
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

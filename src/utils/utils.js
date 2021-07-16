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

export function sortByUpdated(taskA, taskB) {
  return taskA.updatedAt - taskB.updatedAt;
}

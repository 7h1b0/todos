export function formatDate(timestamp) {
  const dt = new Date(timestamp);
  return `${leadingZero(dt.getDate())}.${leadingZero(
    dt.getMonth() + 1,
  )}.${dt.getFullYear()}`;
}

export function leadingZero(receive) {
  return `${receive}`.padStart(2, 0);
}

export function groupBy(items, key) {
  return items.reduce((result, item) => {
    if (item.hasOwnProperty(key)) {
      result[item[key]] = [...(result[item[key]] || []), item];
    }
    return result;
  }, {});
}

export function classNames(...arg) {
  return arg.filter(Boolean).join(' ');
}

export function sortByUpdated(taskA, taskB) {
  return taskA.updatedAt - taskB.updatedAt;
}

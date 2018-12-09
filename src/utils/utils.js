export function formatDate(timestamp) {
  const dt = new Date(timestamp);
  return `${dt.getDate()}.${dt.getMonth() + 1}.${dt.getFullYear()}`;
}

export function groupBy(items, key) {
  return items.reduce((result, item) => {
    if (item[key]) {
      return {
        ...result,
        [item[key]]: [...(result[item[key]] || []), item],
      };
    }
    return result;
  }, {});
}

export function diffByDay(date) {
  return Math.floor((Date.now() - date) / 86400000);
}

export function getClassByDiffDay(days) {
  if (days <= 7) {
    return 'young';
  } else if (days > 7 && days <= 14) {
    return 'old';
  }
  return 'very-old';
}

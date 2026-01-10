var canMakeOrdered = function (a, b) {
  return order(a, b) || order(a.reverse(), b.reverse());
};

const order = (a, b) => {
  const n = a.length;
  let prev = Math.min(a[0], b[0]);

  for (let i = 1; i < n; i += 1) {
    const min = Math.min(a[i], b[i]);
    const max = Math.max(a[i], b[i]);

    if (min >= prev) prev = min;
    else if (max >= prev) prev = max;
    else return false;
  }

  return true;
};

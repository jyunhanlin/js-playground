var minimumCycle = function (s) {
  const n = s.length;

  let min = n;

  for (let k = 1; k <= n; k += 1) {
    const groups = new Array(k).fill().map(() => new Set());

    for (let i = 0; i < n; i += 1) {
      if (s[i] !== '*') {
        groups[i % k].add(s[i]);
      }
    }

    const found = groups.every((group) => group.size <= 1);

    if (found) {
      min = k;
      break;
    }
  }

  return min;
};

var diamondRing = function (n, operations) {
  const prev = new Array(n + 2).fill(0);
  const next = new Array(n + 2).fill(0);

  next[0] = 1;
  for (let i = 1; i <= n; i += 1) {
    prev[i] = i - 1;
    next[i] = i + 1;
  }
  prev[n + 1] = n;

  for (const [a, b, op] of operations) {
    const prevA = prev[a];
    const nextA = next[a];

    next[prevA] = nextA;
    prev[nextA] = prevA;

    if (op === 0) {
      const prevB = prev[b];
      next[prevB] = a;
      prev[a] = prevB;
      next[a] = b;
      prev[b] = a;
    } else {
      const nextB = next[b];
      next[b] = a;
      prev[a] = b;
      next[a] = nextB;
      prev[nextB] = a;
    }
  }
  const result = [];

  let cur = next[0];

  while (cur !== n + 1) {
    result.push(cur);
    cur = next[cur];
  }

  return result;
};

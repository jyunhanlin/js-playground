/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
  const plus = (str, i) => {
    const chs = str.split('').map(Number);

    if (chs[i] === 9) chs[i] = 0;
    else chs[i] += 1;

    return chs.join('');
  };

  const minus = (str, i) => {
    const chs = str.split('').map(Number);
    if (chs[i] === 0) chs[i] = 9;
    else chs[i] -= 1;

    return chs.join('');
  };

  const q = ['0000'];

  deadends = deadends.reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: 1,
    }),
    {}
  );

  const visited = {
    '0000': 1,
  };

  let step = 0;

  while (q.length) {
    const size = q.length;

    for (let i = 0; i < size; i += 1) {
      const cur = q.shift();

      if (deadends[cur]) continue;
      if (cur === target) return step;

      for (j = 0; j < 4; j += 1) {
        const up = plus(cur, j);
        if (!visited[up]) {
          q.push(up);
          visited[up] = 1;
        }

        const down = minus(cur, j);
        if (!visited[down]) {
          q.push(down);
          visited[down] = 1;
        }
      }
    }

    step += 1;
  }

  return -1;
};

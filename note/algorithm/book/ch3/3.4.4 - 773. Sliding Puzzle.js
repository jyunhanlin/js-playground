/**
 * @param {number[][]} board
 * @return {number}
 */
var slidingPuzzle = function (board) {
  const m = 2;
  const n = 3;
  const target = '123450';
  const neighbor = [
    [1, 3],
    [0, 4, 2],
    [1, 5],
    [0, 4],
    [3, 1, 5],
    [4, 2],
  ];

  let start = '';

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      start += `${board[i][j]}`;
    }
  }

  const queue = [start];
  const visited = {
    start: 1,
  };

  let step = 0;

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i += 1) {
      const cur = queue.shift();
      if (target === cur) return step;

      const zeroIndex = cur.split('').indexOf('0');

      for (let j = 0; j < neighbor[zeroIndex].length; j += 1) {
        const adj = neighbor[zeroIndex][j];
        const newBoard = swap(cur, zeroIndex, adj);

        if (!visited[newBoard]) {
          queue.push(newBoard);
          visited[newBoard] = 1;
        }
      }
    }
    step += 1;
  }
  return -1;
};

const swap = (str, i, j) => {
  const a = str.split('');

  [a[i], a[j]] = [a[j], a[i]];

  return a.join('');
};

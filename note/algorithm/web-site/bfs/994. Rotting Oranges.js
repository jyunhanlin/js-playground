/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const queue = [];
  const m = grid.length;
  const n = grid[0].length;
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (grid[i][j] == 2) {
        queue.push([i, j]);
      }
    }
  }

  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let step = 0;
  while (queue.length > 0) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const point = queue.shift();
      for (let dir of dirs) {
        let x = point[0] + dir[0];
        let y = point[1] + dir[1];
        if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] !== 1) continue;

        grid[x][y] = 2;
        queue.push([x, y]);
      }
    }

    step++;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) return -1;
    }
  }

  return step === 0 ? step : step - 1;
};

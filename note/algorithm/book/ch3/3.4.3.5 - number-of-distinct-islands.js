/**
 * @param {number[][]} grid
 * @return {number}
 */
var numDistinctIslands = function (grid) {
  const res = new Set();
  const m = grid.length;
  const n = grid[0].length;

  const dfs = (i, j, dir) => {
    if (i < 0 || j < 0 || i >= m || j >= n) return '';

    if (grid[i][j] === 0) return '';

    grid[i][j] = 0;
    return dfs(i + 1, j, 'D') + dfs(i, j + 1, 'R') + dfs(i - 1, j, 'U') + dfs(i, j - 1, 'L') + dir;
  };

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (grid[i][j] === 1) {
        res.add(dfs(i, j, ''));
      }
    }
  }

  return res.size;
};

console.log(
  numDistinctIslands([
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 0],
    [0, 0, 0, 1, 1],
    [1, 1, 0, 1, 0],
  ])
);

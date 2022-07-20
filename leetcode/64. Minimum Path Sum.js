/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (i === 0 && j === 0) continue;

      if (i === 0) {
        grid[0][j] += grid[0][j - 1];
      } else if (j === 0) {
        grid[i][0] += grid[i - 1][0];
      } else {
        grid[i][j] += Math.min(grid[i][j - 1], grid[i - 1][j]);
      }
    }
  }

  return grid[m - 1][n - 1];
};

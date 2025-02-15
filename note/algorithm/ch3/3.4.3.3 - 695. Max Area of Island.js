/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  let res = 0;
  const m = grid.length;
  const n = grid[0].length;

  const dfs = (i, j) => {
    if (i < 0 || j < 0 || i >= m || j >= n) return 0;

    if (grid[i][j] === 0) return 0;

    grid[i][j] = 0;
    return dfs(i + 1, j) + dfs(i, j + 1) + dfs(i - 1, j) + dfs(i, j - 1) + 1;
  };

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (grid[i][j] === 1) {
        res = Math.max(res, dfs(i, j));
      }
    }
  }

  return res;
};

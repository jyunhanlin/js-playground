/**
 * @param {number[][]} grid1
 * @param {number[][]} grid2
 * @return {number}
 */
var countSubIslands = function (grid1, grid2) {
  let res = 0;
  const m = grid1.length;
  const n = grid1[0].length;

  const dfs = (grid, i, j) => {
    if (i < 0 || j < 0 || i >= m || j >= n) return;

    if (grid[i][j] === 0) return;

    grid[i][j] = 0;
    dfs(grid, i + 1, j);
    dfs(grid, i, j + 1);
    dfs(grid, i - 1, j);
    dfs(grid, i, j - 1);
  };

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      // it's not sub island!!
      if (grid1[i][j] === 0 && grid2[i][j] === 1) {
        dfs(grid2, i, j);
      }
    }
  }

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (grid2[i][j] === 1) {
        res += 1;
        dfs(grid2, i, j);
      }
    }
  }

  return res;
};

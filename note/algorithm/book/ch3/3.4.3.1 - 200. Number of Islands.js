/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let res = 0;
  const m = grid.length;
  const n = grid[0].length;

  const dfs = (i, j) => {
    if (i < 0 || j < 0 || i >= m || j >= n) return;

    if (grid[i][j] === '0') return;

    grid[i][j] = '0';

    dfs(i + 1, j);
    dfs(i, j + 1);
    dfs(i - 1, j);
    dfs(i, j - 1);
  };

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (grid[i][j] === '1') {
        res += 1;

        dfs(i, j);
      }
    }
  }

  return res;
};

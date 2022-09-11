/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var findBall = function (grid) {
  const m = grid.length,
    n = grid[0].length;

  const dfs = (i, j) => {
    if (i === m) return j;
    if (j < 0 || j > n - 1) return -1;
    if ((j === 0 && grid[i][j] === -1) || (j === n - 1 && grid[i][j] === 1)) return -1;

    if (grid[i][j] === 1 && grid[i][j + 1] === 1) return dfs(i + 1, j + 1);

    if (grid[i][j] === -1 && grid[i][j - 1] === -1) return dfs(i + 1, j - 1);

    return -1;
  };

  const res = [];
  for (let j = 0; j < n; j += 1) {
    res.push(dfs(0, j));
  }

  return res;
};

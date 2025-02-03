/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  const memo = new Array(m).fill().map(() => new Array(n).fill(-1));

  // dp: min path sum from (0, 0) to (i, j)
  // dp(i, j): min(dp(i - 1, j), dp(i, j - 1)) + grid[i][j]
  const dp = (i, j) => {
    if (i === 0 && j === 0) return grid[0][0];

    if (i < 0 || j < 0) return Infinity;

    if (memo[i][j] !== -1) return memo[i][j];

    memo[i][j] = Math.min(dp(i - 1, j), dp(i, j - 1)) + grid[i][j];

    return memo[i][j];
  };

  return dp(m - 1, n - 1);
};

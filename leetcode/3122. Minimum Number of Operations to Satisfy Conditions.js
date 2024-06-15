/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumOperations = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const columns = new Array(n).fill().map(() => new Array(10).fill(0));
  const dp = new Array(n + 1).fill().map(() => new Array(10).fill(Infinity));

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      columns[j][grid[i][j]] += 1;
    }
  }

  for (let j = 0; j < 10; j += 1) {
    dp[0][j] = m - (columns[0][j] || 0);
  }

  for (let i = 1; i < n; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      for (let k = 0; k < 10; k += 1) {
        if (j !== k) {
          const count = m - (columns[i][j] || 0);
          dp[i][j] = Math.min(dp[i][j], dp[i - 1][k] + count);
        }
      }
    }
  }
  return Math.min(...dp[n - 1]);
};

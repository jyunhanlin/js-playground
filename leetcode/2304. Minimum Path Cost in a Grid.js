/**
 * @param {number[][]} grid
 * @param {number[][]} moveCost
 * @return {number}
 */
var minPathCost = function (grid, moveCost) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = new Array(m).fill().map((_) => new Array(n).fill(Infinity));

  dp[0] = [...grid[0]];

  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 1][k] + moveCost[grid[i - 1][k]][j] + grid[i][j]);
      }
    }
  }

  return Math.min(...dp[m - 1]);
};

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  const memo = Array.from({ length: m }, () => new Array(n).fill(0));

  const dp = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || obstacleGrid[i][j] === 1) return 0;
    if (obstacleGrid[i][j] === 0 && i === 0 && j === 0) return 1;
    if (memo[i][j] > 0) return memo[i][j];

    memo[i][j] = dp(i - 1, j) + dp(i, j - 1);

    return memo[i][j];
  };

  return dp(m - 1, n - 1);
};

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  dp[1][1] = obstacleGrid[0][0] == 1 ? 0 : 1;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (i == 1 && j == 1) {
        continue;
      }
      if (obstacleGrid[i - 1][j - 1] == 1) {
        continue;
      }
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m][n];
};

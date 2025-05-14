/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  const n = triangle.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(Infinity));

  dp[0][0] = triangle[0][0];

  for (let i = 1; i < n; i += 1) {
    for (let j = 0; j < triangle[i].length; j += 1) {
      if (j - 1 >= 0) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1]) + triangle[i][j];
      } else {
        dp[i][j] = dp[i - 1][j] + triangle[i][j];
      }
    }
  }

  return Math.min(...dp[n - 1]);
};

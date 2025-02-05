/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function (nums) {
  const n = nums.length;
  const points = nums.slice();
  points.unshift(1);
  points.push(1);

  const dp = new Array(n + 2).fill().map(() => new Array(n + 2).fill(0));
  // burst last k ballon
  // dp[i][j] = dp[i][k] + dp[k][j] + points[i] * points[k] * points[j];

  for (let i = n + 1; i >= 0; i -= 1) {
    for (let j = i; j < n + 2; j += 1) {
      for (let k = i + 1; k < j; k += 1) {
        dp[i][j] = Math.max(dp[i][j], dp[i][k] + dp[k][j] + points[i] * points[k] * points[j]);
      }
    }
  }

  return dp[0][n + 1];
};

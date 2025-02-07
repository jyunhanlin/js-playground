/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  const n = coins.length;
  const dp = new Array(n + 1).fill().map(() => new Array(amount + 1).fill(0));

  for (let i = 1; i <= n; i += 1) dp[i][0] = 1;

  for (let i = 1; i <= n; i += 1) {
    for (let j = 1; j <= amount; j += 1) {
      if (j >= coins[i - 1]) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[n][amount];
};

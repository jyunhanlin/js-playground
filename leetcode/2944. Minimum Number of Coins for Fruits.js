/**
 * @param {number[]} prices
 * @return {number}
 */
var minimumCoins = function (prices) {
  const n = prices.length;
  const dp = new Array(n + 1).fill(Infinity);

  dp[0] = 0;
  for (let i = 1; i <= n; i += 1) {
    for (let j = i; j <= Math.min(n, i + i); j++) {
      dp[j] = Math.min(dp[j], dp[i - 1] + prices[i - 1]);
    }
  }

  return dp[n];
};

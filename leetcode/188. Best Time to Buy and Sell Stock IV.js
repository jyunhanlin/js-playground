/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
  const n = prices.length;

  if (k > Math.floor(n / 2)) return maxProfitKInf(prices);

  // const dp = new Array(n).fill().map(() => new Array(k + 1).fill().map(() => [0, 0]));
  const dp = Array.from({ length: n }, () =>
    Array(k + 1)
      .fill()
      .map(() => [0, 0])
  );

  for (let i = 0; i < n; i += 1) {
    dp[i][0][0] = 0;
    dp[i][0][1] = -Infinity;
  }

  for (let j = 1; j <= k; j += 1) {
    dp[0][j][0] = 0;
    dp[0][j][1] = -prices[0];
  }

  for (let i = 1; i < n; i += 1) {
    for (let j = k; j >= 1; j -= 1) {
      dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i]);
      dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i]);
    }
  }

  return dp[n - 1][k][0];
};

const maxProfitKInf = (prices) => {
  const n = prices.length;
  const dp = Array.from({ length: n }, () => Array(2).fill(0));

  dp[0][0] = 0;
  dp[0][1] = -prices[0];

  for (let i = 1; i < n; i += 1) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  }

  return dp[n - 1][0];
};

/**
 * @param {number} n
 * @param {number[][]} offers
 * @return {number}
 */
var maximizeTheProfit = function (n, offers) {
  offers.sort((a, b) => a[1] - b[1]);

  const dp = new Array(n).fill(0);

  let index = 0;

  for (let i = 0; i < n; i += 1) {
    if (index < offers.length && offers[index][1] === i) {
      while (index < offers.length && offers[index][1] === i) {
        const [start, end, gold] = offers[index];
        dp[i] = Math.max(dp[i], (dp[start - 1] || 0) + gold);
        index += 1;
      }
    }

    dp[i] = Math.max(dp[i], dp[i - 1] || 0);
  }

  return dp[n - 1];
};

// TLE
/**
 * @param {number} n
 * @param {number[][]} offers
 * @return {number}
 */
var maximizeTheProfit = function (n, offers) {
  offers.sort((a, b) => a[0] - b[0]);

  const dp = new Array(offers.length).fill(-Infinity);

  for (let i = 0; i < offers.length; i += 1) {
    dp[i] = offers[i][2];
  }

  let max = dp[0];

  for (let i = 1; i < offers.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (offers[i][0] > offers[j][1]) {
        dp[i] = Math.max(dp[i], dp[j] + offers[i][2]);
      }
    }

    max = Math.max(max, dp[i]);
  }

  return max;
};

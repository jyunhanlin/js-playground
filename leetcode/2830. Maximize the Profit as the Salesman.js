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

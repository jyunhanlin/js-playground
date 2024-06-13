/**
 * @param {number} n
 * @return {number}
 */
var countHousePlacements = function (n) {
  const dp = new Array(n + 1).fill(0);
  dp[1] = 2n;
  dp[2] = 3n;

  for (let i = 3; i <= n; i += 1) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return (dp[n] * dp[n]) % BigInt(1e9 + 7);
};

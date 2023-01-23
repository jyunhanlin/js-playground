/**
 * @param {number} n
 * @return {number}
 */
var numTilings = function (n) {
  const dp = new Array(n + 1).fill(0);

  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 5;

  for (let i = 4; i <= n; i += 1) {
    dp[i] = 2 * dp[i - 1] + dp[i - 3];
    dp[i] = dp[i] % (Math.pow(10, 9) + 7);
  }

  return dp[n];
};

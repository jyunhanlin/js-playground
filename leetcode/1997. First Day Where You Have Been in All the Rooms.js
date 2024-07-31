/**
 * @param {number[]} nextVisit
 * @return {number}
 */
var firstDayBeenInAllRooms = function (nextVisit) {
  const MOD = 1e9 + 7;
  const n = nextVisit.length;
  const dp = new Array(n).fill(0);

  for (let i = 1; i < n; i += 1) {
    const even = dp[i - 1] + 1;
    const odd = dp[i - 1] - dp[nextVisit[i - 1]] + 1;

    dp[i] = (even + odd + MOD) % MOD;
  }

  return dp[n - 1];
};

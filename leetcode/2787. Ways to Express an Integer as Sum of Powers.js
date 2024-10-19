/**
 * @param {number} n
 * @param {number} x
 * @return {number}
 */
var numberOfWays = function (n, x) {
  const MOD = 1e9 + 7;
  const dp = {};

  const helper = (num, remain) => {
    if (remain < 0) return 0;
    if (remain === 0) return 1;
    if (Math.pow(num, x) > remain) return 0;
    const key = `${num}-${remain}`;
    if (dp[key]) return dp[key];

    const pick = helper(num + 1, remain - Math.pow(num, x)) % MOD;
    const skip = helper(num + 1, remain) % MOD;

    dp[key] = (pick + skip) % MOD;
    return dp[key];
  };

  return helper(1, n);
};

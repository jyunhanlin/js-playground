/**
 * @param {number} n
 * @param {number} delay
 * @param {number} forget
 * @return {number}
 */
var peopleAwareOfSecret = function (n, delay, forget) {
  const MOD = 1e9 + 7;

  const dp = {};
  const helper = (cur) => {
    if (dp[cur]) return dp[cur];

    let res = cur + forget > n ? 1 : 0;
    for (let i = cur + delay; i < Math.min(cur + forget, n + 1); i += 1) {
      res = (res + helper(i)) % MOD;
    }

    return (dp[cur] = res);
  };

  return helper(1);
};

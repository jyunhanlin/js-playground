/**
 * @param {number} n
 * @param {number} delay
 * @param {number} forget
 * @return {number}
 */
var peopleAwareOfSecret = function (n, delay, forget) {
  const MOD = 1e9 + 7;

  const dp = new Array(n).fill().map(() => new Array(forget).fill(0));

  dp[0][0] = 1;

  for (let i = 1; i < n; i += 1) {
    for (let j = 0; j < forget; j += 1) {
      dp[i][j] += (dp[i - 1][j - 1] || 0) % MOD;
      if (j - delay >= 0) dp[i][0] += dp[i][j] % MOD;
    }
  }

  return dp[n - 1].reduce((a, b) => a + b) % MOD;
};

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

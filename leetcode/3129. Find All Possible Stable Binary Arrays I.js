/**
 * @param {number} zero
 * @param {number} one
 * @param {number} limit
 * @return {number}
 */
var numberOfStableArrays = function (zero, one, limit) {
  const MOD = 1e9 + 7;
  const dp = {};

  const helper = (z, o, tail, count) => {
    if (z < 0 || o < 0 || count > limit) return 0;

    if (z === 0 && o === 0) return 1;

    const key = `${z}-${o}-${tail}-${count}`;
    if (dp[key]) return dp[key];

    let num = 0;

    if (tail === 0) {
      num += helper(z - 1, o, 0, count + 1) % MOD;
      num += helper(z, o - 1, 1, 1) % MOD;
    }

    if (tail === 1) {
      num += helper(z, o - 1, 1, count + 1) % MOD;
      num += helper(z - 1, o, 0, 1) % MOD;
    }

    dp[key] = num;

    return num;
  };

  return (helper(zero - 1, one, 0, 1) + helper(zero, one - 1, 1, 1)) % MOD;
};

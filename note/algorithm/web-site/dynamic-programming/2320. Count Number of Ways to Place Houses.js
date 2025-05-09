/**
 * @param {number} n
 * @return {number}
 */
var countHousePlacements = function (n) {
  const MOD = BigInt(1e9 + 7);
  const memo = new Array(n + 1).fill(-1n);

  const dp = (i) => {
    if (i >= n) return 1n;
    if (memo[i] !== -1n) return memo[i];

    memo[i] = (dp(i + 1) + dp(i + 2)) % MOD;

    return memo[i];
  };

  const res = dp(0);

  return Number((res * res) % MOD);
};

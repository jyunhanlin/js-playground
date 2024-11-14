/**
 * @param {number} startPos
 * @param {number} endPos
 * @param {number} k
 * @return {number}
 */
var numberOfWays = function (startPos, endPos, k) {
  const MOD = 1e9 + 7;

  const dp = new Map();
  const helper = (pos, curK) => {
    if (pos === endPos && curK === 0) return 1;
    if (curK === 0) return 0;

    const key = `${pos}-${curK}`;
    if (dp.has(key)) return dp.get(key);

    const res = (helper(pos + 1, curK - 1) + helper(pos - 1, curK - 1)) % MOD;
    dp.set(key, res);

    return res;
  };

  return helper(startPos, k);
};

// TLE
/**
 * @param {number} startPos
 * @param {number} endPos
 * @param {number} k
 * @return {number}
 */
var numberOfWays = function (startPos, endPos, k) {
  const MOD = 1e9 + 7;

  const dp = {};
  const helper = (pos, curK) => {
    if (pos === endPos && curK === 0) return 1;
    if (curK === 0) return 0;

    const key = `${pos}-${curK}`;
    if (dp[key]) return dp[key];

    dp[key] = (helper(pos + 1, curK - 1) + helper(pos - 1, curK - 1)) % MOD;

    return dp[key];
  };

  return helper(startPos, k);
};

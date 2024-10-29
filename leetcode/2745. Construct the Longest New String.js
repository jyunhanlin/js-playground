/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {number}
 */
var longestString = function (x, y, z) {
  const dp = {};

  const helper = (i, j, k, last) => {
    if (i <= 0 && j <= 0 && k <= 0) return 0;
    const key = `${i}-${j}-${k}-${last}`;
    if (dp[key]) return dp[key];

    let count = 0;
    if (last === 1) {
      if (j) count = Math.max(count, 2 + helper(i, j - 1, k, 2));
    } else {
      if (i) count = Math.max(count, 2 + helper(i - 1, j, k, 1));
      if (k) count = Math.max(count, 2 + helper(i, j, k - 1, 3));
    }

    dp[key] = count;

    return dp[key];
  };

  return Math.max(helper(x - 1, y, z, 1), helper(x, y - 1, z, 2), helper(x, y, z - 1, 3)) + 2;
};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {number}
 */
var longestString = function (x, y, z) {
  if (x === y) return 4 * x + z * 2;

  const mn = Math.min(x, y);
  return 2 * mn + (mn + 1) * 2 + z * 2;
};

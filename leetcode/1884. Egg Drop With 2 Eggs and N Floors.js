/**
 * @param {number} n
 * @return {number}
 */
var twoEggDrop = function (n) {
  const dp = new Array(n + 1).fill(0);

  const drop = (floors) => {
    if (floors <= 1) return floors;
    if (dp[floors] !== 0) return dp[floors];

    let res = Infinity;
    for (let i = 1; i <= floors; i += 1) {
      res = Math.min(res, Math.max(i - 1, drop(floors - i)) + 1);
    }

    dp[floors] = res;

    return dp[floors];
  };

  return drop(n);
};

/**
 * @param {number} n
 * @return {number}
 */
var twoEggDrop = function (n) {
  return Math.ceil((Math.sqrt(1 + 8 * n) - 1) / 2);
};

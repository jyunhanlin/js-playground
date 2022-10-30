/**
 * @param {number} n
 * @return {number}
 */
var twoEggDrop = function (n) {
  const dp = new Array(n + 1).fill(0);

  const drop = (floors) => {
    if (floors <= 1) return floors;
    if (dp[floors]) return dp[floors];

    dp[floors] = Infinity;
    for (let i = 1; i <= floors; i += 1) {
      // egg broken -> go through all i - 1 floors
      // egg not broken -> recursive drop(n - i) <-- think i as 0 floor
      dp[floors] = Math.min(dp[floors], Math.max(i - 1, drop(floors - i)) + 1);
    }

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

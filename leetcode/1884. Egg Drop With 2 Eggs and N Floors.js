/**
 * @param {number} n
 * @return {number}
 */
var twoEggDrop = function (n) {
  const dp = new Array(n + 1).fill(0).map(() => new Array(2).fill(0));

  const drop = (floors, eggs) => {
    if (eggs == 1 || floors <= 1) return floors;
    if (dp[floors][eggs] > 0) return dp[floors][eggs];
    let min = Infinity;
    for (let i = 1; i <= floors; i++)
      min = Math.min(min, 1 + Math.max(drop(i - 1, eggs - 1, dp), drop(floors - i, eggs, dp)));
    dp[floors][eggs] = min;
    return min;
  };

  return drop(n, 2);
};

/**
 * @param {number} n
 * @return {number}
 */
var twoEggDrop = function (n) {
  return Math.ceil((Math.sqrt(1 + 8 * n) - 1) / 2);
};

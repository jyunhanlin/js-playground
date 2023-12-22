/**
 * @param {number} n
 * @return {number}
 */
var soupServings = function (n) {
  const dp = {};

  const helper = (a, b) => {
    if (a <= 0 && b <= 0) return 0.5;
    if (a <= 0) return 1;
    if (b <= 0) return 0;
    if (dp[`${a}_${b}`]) return dp[`${a}_${b}`];

    console.log(a, b, helper(a - 50, b - 50));

    dp[`${a}_${b}`] =
      0.25 *
      (helper(a - 100, b) +
        helper(a - 75, b - 25) +
        helper(a - 50, b - 50) +
        helper(a - 25, b - 75));

    return dp[`${a}_${b}`];
  };

  return n > 4800 ? 1 : helper(n, n);
};

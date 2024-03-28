/**
 * @param {number} n
 * @return {number}
 */
var getMoneyAmount = function (n) {
  const dp = new Array(n + 1).fill().map(() => new Array(n + 1).fill(Infinity));

  const helper = (left, right) => {
    if (left >= right) return 0;
    if (dp[left][right] !== Infinity) return dp[left][right];

    for (let i = left; i <= right; i += 1) {
      dp[left][right] = Math.min(
        dp[left][right],
        i + Math.max(helper(left, i - 1), helper(i + 1, right))
      );
    }

    return dp[left][right];
  };

  return helper(1, n);
};

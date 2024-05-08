/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var minimumOperationsToMakeEqual = function (x, y) {
  const dp = {};

  const helper = (cur) => {
    if (y >= cur) return y - cur;
    if (dp[cur]) return dp[cur];

    let ans = Math.abs(y - cur);
    ans = Math.min(helper(Math.floor(cur / 5)) + (cur % 5) + 1, ans);
    ans = Math.min(helper(Math.floor(cur / 5) + 1) + 5 - (cur % 5) + 1, ans);
    ans = Math.min(helper(Math.floor(cur / 11)) + (cur % 11) + 1, ans);
    ans = Math.min(helper(Math.floor(cur / 11) + 1) + 11 - (cur % 11) + 1, ans);

    dp[cur] = ans;
    return dp[cur];
  };

  return helper(x);
};

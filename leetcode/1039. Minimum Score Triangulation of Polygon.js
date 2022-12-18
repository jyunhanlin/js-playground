/**
 * @param {number[]} values
 * @return {number}
 */
// bottom up
var minScoreTriangulation = function (values) {
  const len = values.length;
  const dp = new Array(len).fill().map(() => new Array(len).fill(0));

  for (let i = len - 1; i >= 0; i -= 1) {
    for (let j = i + 1; j < len; j += 1) {
      for (let k = i + 1; k < j; k += 1) {
        dp[i][j] = Math.min(
          dp[i][j] === 0 ? Infinity : dp[i][j],
          dp[i][k] + values[i] * values[k] * values[j] + dp[k][j]
        );
      }
    }
  }

  return dp[0][len - 1];
};

// top down
var minScoreTriangulation = function (values) {
  const len = values.length;
  const dp = new Array(len).fill().map(() => new Array(len).fill(0));

  const helper = (i, j) => {
    if (dp[i][j]) return dp[i][j];
    let res = Infinity;

    for (let k = i + 1; k < j; k += 1) {
      res = Math.min(res, helper(i, k) + values[i] * values[k] * values[j] + helper(k, j));
    }

    if (res === Infinity) res = 0;

    dp[i][j] = res;
    return dp[i][j];
  };

  return helper(0, len - 1);
};

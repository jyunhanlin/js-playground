/**
 * @param {number[]} values
 * @return {number}
 */
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

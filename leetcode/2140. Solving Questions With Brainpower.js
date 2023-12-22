/**
 * @param {number[][]} questions
 * @return {number}
 */
var mostPoints = function (questions) {
  const len = questions.length;
  const dp = new Array(len).fill(0);

  for (let i = len - 1; i >= 0; i -= 1) {
    const point = questions[i][0];
    const power = questions[i][1];

    const pick = point + (dp[i + power + 1] || 0);
    const skip = dp[i + 1] || 0;

    dp[i] = Math.max(pick, skip);
  }

  return dp[0];
};

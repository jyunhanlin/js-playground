/**
 * @param {number[][]} questions
 * @return {number}
 */
var mostPoints = function (questions) {
  const n = questions.length;

  const memo = new Array(n).fill(-1);

  const dp = (index) => {
    if (index >= n) return 0;
    if (memo[index] !== -1) return memo[index];

    memo[index] = Math.max(
      questions[index][0] + dp(index + questions[index][1] + 1),
      dp(index + 1)
    );

    return memo[index];
  };

  return dp(0);
};

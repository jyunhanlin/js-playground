/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  const stack = [];
  const dp = new Array(s.length + 1).fill(0);

  let max = 0;

  for (let i = 0; i < s.length; i += 1) {
    if (s[i] === '(') {
      stack.push(i);
      dp[i + 1] = 0;
    } else {
      if (stack.length) {
        const leftIndex = stack.pop();
        dp[i + 1] = i - (leftIndex - dp[leftIndex]) + 1;
      } else dp[i + 1] = 0;
    }
    max = Math.max(max, dp[i + 1]);
  }

  return max;
};

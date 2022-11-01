/**
 * @param {string} s
 * @return {number}
 */
var minimumDeletions = function (s) {
  const dp = new Array(s.length + 1).fill(0);
  let pre = 0;

  for (let i = 0; i < s.length; i += 1) {
    if (s[i] === 'a') {
      dp[i + 1] = Math.min(dp[i] + 1, pre);
    } else {
      dp[i + 1] = dp[i];
      pre += 1;
    }
  }

  return dp[s.length];
};

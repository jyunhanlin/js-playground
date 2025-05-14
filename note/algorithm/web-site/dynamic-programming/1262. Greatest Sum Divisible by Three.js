/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumDivThree = function (nums) {
  const n = nums.length;
  const dp = Array.from({ length: n + 1 }, () => Array(3).fill(0));

  dp[0][0] = 0;
  dp[0][1] = -Infinity;
  dp[0][2] = -Infinity;

  for (let i = 1; i <= n; i += 1) {
    const cur = nums[i - 1];

    if (cur % 3 === 0) {
      dp[i][0] = dp[i - 1][0] + cur;
      dp[i][1] = dp[i - 1][1] + cur;
      dp[i][2] = dp[i - 1][2] + cur;
    } else if (cur % 3 === 1) {
      dp[i][0] = Math.max(dp[i - 1][2] + cur, dp[i - 1][0]);
      dp[i][1] = Math.max(dp[i - 1][0] + cur, dp[i - 1][1]);
      dp[i][2] = Math.max(dp[i - 1][1] + cur, dp[i - 1][2]);
    } else {
      dp[i][0] = Math.max(dp[i - 1][1] + cur, dp[i - 1][0]);
      dp[i][1] = Math.max(dp[i - 1][2] + cur, dp[i - 1][1]);
      dp[i][2] = Math.max(dp[i - 1][0] + cur, dp[i - 1][2]);
    }
  }

  return dp[n][0];
};

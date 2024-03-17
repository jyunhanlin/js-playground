/**
 * @param {number[]} nums
 * @return {number}
 */
var longestArithSeqLength = function (nums) {
  const dp = {};
  let result = 0;
  for (let i = 0; i < nums.length; i += 1) {
    if (!dp[i]) dp[i] = {};

    for (let j = 0; j < i; j += 1) {
      const diff = nums[i] - nums[j];

      dp[i][diff] = 1 + (dp[j][diff] || 1);

      result = Math.max(dp[i][diff], result);
    }
  }

  return result;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function (nums) {
  const dp = new Array(nums.length).fill().map(() => new Array(2).fill(1));

  for (let i = 1; i < nums.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (nums[i] - nums[j] > 0) {
        dp[i][1] = Math.max(dp[j][0] + 1, dp[i][1]);
      } else if (nums[i] - nums[j] < 0) {
        dp[i][0] = Math.max(dp[j][1] + 1, dp[i][0]);
      }
    }
  }

  return Math.max(...dp[nums.length - 1]);
};

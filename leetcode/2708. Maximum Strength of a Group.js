/**
 * @param {number[]} nums
 * @return {number}
 */
var maxStrength = function (nums) {
  if (nums.length === 1) return nums[0];

  const n = nums.length;

  const dp = new Array(n).fill().map(() => new Array(2));

  dp[0][0] = Math.max(0, nums[0]);
  dp[0][1] = Math.min(0, nums[0]);

  for (let i = 1; i < n; i += 1) {
    const num = nums[i];
    dp[i][0] = Math.max(dp[i - 1][0], nums[i], num * dp[i - 1][0], num * dp[i - 1][1]);
    dp[i][1] = Math.min(dp[i - 1][1], nums[i], num * dp[i - 1][0], num * dp[i - 1][1]);
  }

  return dp[n - 1][0];
};

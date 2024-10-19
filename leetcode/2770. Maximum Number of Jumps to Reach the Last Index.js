/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var maximumJumps = function (nums, target) {
  const n = nums.length;
  const dp = new Array(n).fill(-1);

  dp[0] = 0;
  for (let j = 0; j < n; j += 1) {
    for (let i = 0; i < j; i += 1) {
      if (dp[i] !== -1 && Math.abs(nums[j] - nums[i]) <= target) {
        dp[j] = Math.max(dp[j], dp[i] + 1);
      }
    }
  }

  return dp[n - 1];
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minIncrementOperations = function (nums, k) {
  const n = nums.length;
  const dp = new Array(n).fill(Infinity);

  dp[0] = k - nums[0] < 0 ? 0 : k - nums[0];
  dp[1] = k - nums[1] < 0 ? 0 : k - nums[1];
  dp[2] = k - nums[2] < 0 ? 0 : k - nums[2];

  for (let i = 3; i < n; i += 1) {
    dp[i] = k - nums[i] < 0 ? 0 : k - nums[i];
    dp[i] += Math.min(dp[i - 3], dp[i - 2], dp[i - 1]);
  }

  return Math.min(dp[n - 1], dp[n - 2], dp[n - 3]);
};

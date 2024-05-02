/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubarraySumCircular = function (nums) {
  const dp1 = [nums[0]];
  const dp2 = [nums[0]];
  let total = nums[0];

  for (let i = 1; i < nums.length; i += 1) {
    dp1[i] = Math.max(dp1[i - 1] + nums[i], nums[i]);
    dp2[i] = Math.min(dp2[i - 1] + nums[i], nums[i]);

    total += nums[i];
  }

  const maxSum = Math.max(...dp1);
  const minSum = Math.min(...dp2);

  return maxSum > 0 ? Math.max(maxSum, total - minSum) : maxSum;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxResult = function (nums, k) {
  const dp = new Array(nums.length).fill(-Infinity);

  dp[0] = nums[0];

  for (let i = 1; i < nums.length; i += 1) {
    for (let j = i - 1; j >= i - k; j -= 1) {
      if (j >= 0) dp[i] = Math.max(dp[i], dp[j] + nums[i]);
    }
  }

  return dp[nums.length - 1];
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {
  const dp = new Array(nums.length).fill(1);
  const dpLIS = new Array(nums.length).fill(1);

  for (let i = 0; i < nums.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (nums[j] < nums[i]) {
        if (dpLIS[i] < dpLIS[j] + 1) {
          dpLIS[i] = dpLIS[j] + 1;

          dp[i] = dp[j];
        } else if (dpLIS[i] === dpLIS[j] + 1) {
          dp[i] += dp[j];
        }
      }
    }
  }

  const longestPath = Math.max(...dpLIS);

  let result = 0;
  for (let i = 0; i < nums.length; i += 1) {
    if (dpLIS[i] === longestPath) result += dp[i];
  }

  return result;
};

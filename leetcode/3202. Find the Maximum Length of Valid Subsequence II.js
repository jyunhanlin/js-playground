/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumLength = function (nums, k) {
  const dp = new Array(nums.length).fill().map(() => new Array(k).fill(1));

  let max = 0;

  for (let j = 1; j < nums.length; j += 1) {
    for (let i = 0; i < j; i += 1) {
      const mod = (nums[i] + nums[j]) % k;

      dp[j][mod] = dp[i][mod] + 1;

      max = Math.max(max, dp[j][mod]);
    }
  }

  return max;
};

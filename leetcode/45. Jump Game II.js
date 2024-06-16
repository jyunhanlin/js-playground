/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  const dp = new Array(nums.length).fill(Infinity);

  dp[0] = 0;

  for (let i = 0; i < nums.length; i += 1) {
    const steps = nums[i];
    for (let j = 0; j <= steps; j += 1) {
      const k = i + j < nums.length ? i + j : nums.length - 1;

      dp[k] = Math.min(dp[k], dp[i] + 1);
    }
  }

  return dp[nums.length - 1];
};

// Input: nums = [2,3,1,1,4]
// Output: 2
console.log(jump([2, 3, 1, 1, 4]));

// Input: nums = [2,3,0,1,4]
// Output: 2
console.log(jump([2, 3, 0, 1, 4]));

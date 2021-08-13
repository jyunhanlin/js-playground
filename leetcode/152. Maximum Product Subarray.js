/**
 * Concept:
 * 1. 類似 53. Maximum maxSubArray
 * 2. 但需要另外保存最小值
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  const dpMax = [nums[0]];
  const dpMin = [nums[0]];

  for (let i = 1; i < nums.length; i += 1) {
    dpMax[i] = Math.max(dpMax[i - 1] * nums[i], dpMin[i - 1] * nums[i], nums[i]);

    dpMin[i] = Math.min(dpMax[i - 1] * nums[i], dpMin[i - 1] * nums[i], nums[i]);
  }

  return Math.max(...dpMax);
};

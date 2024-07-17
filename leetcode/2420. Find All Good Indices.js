/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var goodIndices = function (nums, k) {
  const len = nums.length;
  const dp1 = new Array(len).fill(1);
  const dp2 = new Array(len).fill(1);

  for (let i = 1; i < len; i += 1) {
    if (nums[i] <= nums[i - 1]) dp1[i] = dp1[i - 1] + 1;
  }

  for (let i = len - 2; i >= 0; i -= 1) {
    if (nums[i + 1] >= nums[i]) dp2[i] = dp2[i + 1] + 1;
  }

  const result = [];

  for (let i = k; i < len - k; i += 1) {
    if (dp1[i - 1] >= k && dp2[i + 1] >= k) result.push(i);
  }

  return result;
};

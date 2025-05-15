/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  const n = nums.length;
  const dp1 = new Array(n).fill(-Infinity);
  const dp2 = new Array(n).fill(Infinity);

  dp1[0] = nums[0];
  dp2[0] = nums[0];

  let max = dp1[0];
  for (let i = 1; i < n; i += 1) {
    dp1[i] = Math.max(nums[i], nums[i] * dp1[i - 1], nums[i] * dp2[i - 1]);
    dp2[i] = Math.min(nums[i], nums[i] * dp1[i - 1], nums[i] * dp2[i - 1]);
    max = Math.max(max, dp1[i]);
  }

  return max;
};

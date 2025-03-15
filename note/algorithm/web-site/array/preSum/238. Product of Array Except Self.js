/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const n = nums.length;

  const prefix = [];
  prefix[0] = nums[0];
  for (let i = 1; i < n; i += 1) {
    prefix[i] = prefix[i - 1] * nums[i];
  }

  const suffix = [];
  suffix[n - 1] = nums[n - 1];
  for (let i = n - 2; i >= 0; i -= 1) {
    suffix[i] = suffix[i + 1] * nums[i];
  }

  const res = [];
  res[0] = suffix[1];
  res[n - 1] = prefix[n - 2];

  for (let i = 1; i < n - 1; i += 1) {
    res[i] = prefix[i - 1] * suffix[i + 1];
  }

  return res;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
  if (k <= 1) return 0;
  let res = 0,
    left = 0,
    right = 0,
    product = 1;
  while (right < nums.length) {
    product *= nums[right];
    while (product >= k) {
      product /= nums[left];
      left++;
    }
    res += right - left + 1;
    right++;
  }
  return res;
};

const productResult = (arr) => arr.reduce((acc, cur) => (acc *= cur), 1);

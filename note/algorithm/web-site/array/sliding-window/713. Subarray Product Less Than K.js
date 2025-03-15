/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
  const n = nums.length;
  let left = 0;
  let right = 0;

  let count = 0;

  let curProduct = 1;
  while (right < n) {
    curProduct *= nums[right];
    right += 1;

    while (curProduct >= k && left < right) {
      curProduct /= nums[left];
      left += 1;
    }

    count += right - left;
  }

  return count;
};

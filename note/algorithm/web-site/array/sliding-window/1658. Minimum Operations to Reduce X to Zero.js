/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minOperations = function (nums, x) {
  const n = nums.length;
  const sum = nums.reduce((a, b) => a + b);

  const target = sum - x; // find the longest subarray with window sum is target

  let left = 0;
  let right = 0;
  let winSum = 0;
  let maxLen = -Infinity;
  while (right < n) {
    winSum += nums[right];
    right += 1;

    while (winSum > target && left < right) {
      winSum -= nums[left];
      left += 1;
    }

    if (winSum === target) {
      maxLen = Math.max(maxLen, right - left);
    }
  }

  return maxLen !== -Infinity ? n - maxLen : -1;
};

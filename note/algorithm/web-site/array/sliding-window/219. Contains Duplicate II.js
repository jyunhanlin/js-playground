/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  const n = nums.length;
  let left = 0;
  let right = 0;
  const win = new Set();

  while (right < n) {
    if (win.has(nums[right])) return true;

    win.add(nums[right]);
    right += 1;

    while (right - left > k) {
      win.delete(nums[left]);
      left += 1;
    }
  }

  return false;
};

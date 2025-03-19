/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    // dedup
    while (left < right && nums[left] == nums[left + 1]) {
      left++;
    }
    while (left < right && nums[right] == nums[right - 1]) {
      right--;
    }
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) return true;

    if (nums[mid] >= nums[left]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (target <= nums[right] && target > nums[mid]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return false;
};

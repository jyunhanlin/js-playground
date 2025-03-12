/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let slow = 0;
  let fast = 0;
  const n = nums.length;

  let count = 0;
  while (fast < n) {
    if (nums[slow] !== nums[fast] || (slow < fast && count < 2)) {
      slow += 1;
      nums[slow] = nums[fast];
    }
    fast += 1;
    count += 1;

    if (nums[fast] !== nums[fast - 1]) {
      count = 0;
    }
  }

  return slow + 1;
};

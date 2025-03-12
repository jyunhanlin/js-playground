/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  let p = 0;
  while (p <= right) {
    if (nums[p] === 0) {
      [nums[left], nums[p]] = [nums[p], nums[left]];
      left += 1;
    } else if (nums[p] === 2) {
      [nums[right], nums[p]] = [nums[p], nums[right]];
      right -= 1;
    } else {
      p += 1;
    }

    p = p < left ? left : p;
  }
};

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let fast = 0;
  let slow = 0;

  while (fast < nums.length) {
    if (nums[fast] !== 2) {
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
      slow += 1;
    }
    fast += 1;
  }

  const newLen = slow;

  slow = 0;
  fast = 0;

  while (fast < newLen) {
    if (nums[fast] !== 1) {
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
      slow += 1;
    }
    fast += 1;
  }
};

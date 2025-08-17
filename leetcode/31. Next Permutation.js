/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  let i = nums.length - 1;
  while (i > 0 && nums[i - 1] >= nums[i]) {
    i--;
  }
  if (i === 0) {
    nums.reverse();
    return;
  }
  let j = nums.length - 1;
  while (j >= i && nums[j] <= nums[i - 1]) {
    j--;
  }
  [nums[i - 1], nums[j]] = [nums[j], nums[i - 1]];

  let start = i;
  let end = nums.length - 1;

  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
};

// 1 2 3 4
// 1 2 4 3
// 1 3 2 4
// 1 3 4 2
// 1 4 2 3
// 1 4 3 2
// 2 1 3 4
// 2 1 4 3
// 2 3 1 4
// 2 3 4 1
// ....

// for 1 3 4 2
// i would be 4
// j would be 4
// after swap 1 4 3 2
// after reverse 1 4 2 3

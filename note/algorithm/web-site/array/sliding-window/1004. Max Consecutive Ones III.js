/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function (nums, k) {
  let left = 0;
  let right = 0;

  let count = 0;
  let winCount = 0;

  while (right < nums.length) {
    if (nums[right] === 1) winCount += 1;
    right += 1;

    while (right - left - winCount > k) {
      if (nums[left] === 1) winCount -= 1;
      left += 1;
    }

    count = Math.max(count, right - left);
  }

  return count;
};

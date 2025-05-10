/**
 * @param {number[]} nums
 * @return {number}
 */
var maxArrayValue = function (nums) {
  let res = 0;
  let i = nums.length - 1;

  while (i >= 0) {
    let blockSum = nums[i];

    while (i > 0 && blockSum >= nums[i - 1]) {
      blockSum += nums[i - 1];
      i--;
    }
    res = Math.max(res, blockSum);
    i--;
  }

  return res;
};

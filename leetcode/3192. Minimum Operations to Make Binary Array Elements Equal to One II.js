/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  let flag = 1;
  let count = 0;

  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] != flag) {
      count += 1;
      flag = !flag;
    }
  }

  return count;
};

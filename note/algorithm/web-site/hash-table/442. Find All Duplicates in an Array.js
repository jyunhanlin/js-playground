/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function (nums) {
  const res = [];

  for (const num of nums) {
    if (nums[Math.abs(num) - 1] < 0) {
      res.push(Math.abs(num));
    } else {
      nums[Math.abs(num) - 1] *= -1;
    }
  }
  return res;
};

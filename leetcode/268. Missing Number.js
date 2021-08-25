/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  const res = new Array(nums.length + 1).fill(-1);

  for (let i = 0; i < nums.length; i += 1) {
    const num = nums[i];
    res[num] = num;
  }

  return res.indexOf(-1);
};

const missingNumber = (nums) =>
  (nums.length * (nums.length + 1)) / 2 - nums.reduce((a, c) => a + c);

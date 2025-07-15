/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  let res = 0;
  res ^= nums.length;

  for (let i = 0; i < nums.length; i += 1) {
    res ^= i ^ nums[i];
  }

  return res;
};

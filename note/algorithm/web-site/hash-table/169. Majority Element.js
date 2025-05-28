/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let target = 0;

  let count = 0;

  for (let i = 0; i < nums.length; i += 1) {
    if (count === 0) {
      target = nums[i];
      count = 1;
    } else if (nums[i] === target) {
      count += 1;
    } else {
      count -= 1;
    }
  }

  return target;
};

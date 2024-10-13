/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var maxScore = function (nums, x) {
  let even = nums[0] - (nums[0] % 2 === 0 ? 0 : x);
  let odd = nums[0] - (nums[0] % 2 === 0 ? x : 0);

  for (let i = 1; i < nums.length; i += 1) {
    if (nums[i] % 2 === 0) {
      even = nums[i] + Math.max(even, odd - x);
    } else {
      odd = nums[i] + Math.max(odd, even - x);
    }
  }
  return Math.max(even, odd);
};

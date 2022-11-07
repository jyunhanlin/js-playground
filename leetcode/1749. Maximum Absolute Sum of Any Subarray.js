/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAbsoluteSum = function (nums) {
  let sum = 0,
    min = 0,
    max = 0;

  for (let i = 0; i < nums.length; i += 1) {
    sum += nums[i];

    min = Math.min(min, sum);
    max = Math.max(max, sum);
  }

  return max - min;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAbsoluteSum = function (nums) {
  let sum = 0,
    max = -Infinity,
    min = Infinity;

  for (let i = 0; i < nums.length; i += 1) {
    sum += nums[i];
    max = Math.max(max, sum);
    sum = Math.max(0, sum);
  }

  sum = 0;
  for (let i = 0; i < nums.length; i += 1) {
    sum += nums[i];
    min = Math.min(min, sum);
    sum = Math.min(0, sum);
  }

  return Math.max(Math.abs(max), Math.abs(min));
};

// refer to: https://leetcode.com/problems/maximum-alternating-subsequence-sum/discuss/1298499/JavaC%2B%2BPython-Best-Time-to-Buy-and-Sell-Stock
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAlternatingSum = function (nums) {
  let odd = 0;
  let even = 0;

  for (let i = 0; i < nums.length; i += 1) {
    even = Math.max(even, odd + nums[i]);

    odd = even - nums[i];
  }

  return even;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAlternatingSum = function (nums) {
  let res = nums[0];

  for (let i = 1; i < nums.length; i += 1) {
    res += Math.max(nums[i] - nums[i - 1], 0);
  }

  return res;
};

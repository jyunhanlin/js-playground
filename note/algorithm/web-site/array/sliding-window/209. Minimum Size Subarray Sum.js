/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  const n = nums.length;
  let left = 0;
  let right = 0;

  let sum = 0;

  let res = Infinity;
  while (right < n) {
    sum += nums[right];
    right += 1;

    while (sum >= target && left < right) {
      res = Math.min(res, right - left);

      sum -= nums[left];
      left += 1;
    }
  }

  return res === Infinity ? 0 : res;
};

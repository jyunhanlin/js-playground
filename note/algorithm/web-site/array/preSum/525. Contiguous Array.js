/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function (nums) {
  const n = nums.length;
  const preSum = [0];

  for (let i = 1; i <= n; i += 1) {
    preSum[i] = preSum[i - 1] + (nums[i - 1] === 0 ? -1 : 1);
  }

  const sumMap = new Map();

  let res = 0;
  for (let i = 0; i < preSum.length; i += 1) {
    if (!sumMap.has(preSum[i])) sumMap.set(preSum[i], i);
    else res = Math.max(res, i - sumMap.get(preSum[i]));
  }

  return res;
};

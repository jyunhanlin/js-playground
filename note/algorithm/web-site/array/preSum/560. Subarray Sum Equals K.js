/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  const n = nums.length;
  const preSum = [0];

  for (let i = 1; i <= n; i += 1) {
    preSum[i] = preSum[i - 1] + nums[i - 1];
  }

  let res = 0;
  let needMap = new Map();
  needMap.set(0, 1);
  for (let i = 1; i < preSum.length; i += 1) {
    const need = preSum[i] - k;

    if (needMap.has(need)) res += needMap.get(need);

    if (!needMap.has(preSum[i])) needMap.set(preSum[i], 1);
    else needMap.set(preSum[i], needMap.get(preSum[i]) + 1);
  }

  return res;
};

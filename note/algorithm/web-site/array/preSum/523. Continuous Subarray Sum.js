/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function (nums, k) {
  const n = nums.length;
  const preSum = [0];

  for (let i = 1; i <= n; i += 1) {
    preSum[i] = preSum[i - 1] + nums[i - 1];
  }

  const sumModMap = new Map();
  for (let i = 0; i < preSum.length; i += 1) {
    const mod = preSum[i] % k;

    if (!sumModMap.has(mod)) sumModMap.set(mod, i);
    // (preSum[i] - preSum[j]) % k === 0 => preSum[i] % k == preSum[j] % k
    else if (i - sumModMap.get(mod) > 1) return true;
  }

  return false;
};

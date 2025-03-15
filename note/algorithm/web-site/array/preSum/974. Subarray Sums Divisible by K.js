/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraysDivByK = function (nums, k) {
  const n = nums.length;
  const preSum = [0];

  for (let i = 1; i <= n; i += 1) {
    preSum[i] = preSum[i - 1] + nums[i - 1];
  }

  const remainderMap = new Map();
  remainderMap.set(0, 1);

  let res = 0;
  for (let i = 1; i < preSum.length; i += 1) {
    let curRemainder = preSum[i] % k;

    if (curRemainder < 0) curRemainder += k;

    if (!remainderMap.has(curRemainder)) remainderMap.set(curRemainder, 1);
    else {
      // (preSum[i] - preSum[j]) % k === 0 => preSum[i] % k == preSum[j] % k
      const count = remainderMap.get(curRemainder);
      res += count;
      remainderMap.set(curRemainder, count + 1);
    }
  }

  return res;
};

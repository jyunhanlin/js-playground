/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  const n = nums.length;
  const preSum = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i += 1) {
    preSum[i] = preSum[i - 1] + nums[i - 1];
  }

  for (let i = 1; i <= n; i += 1) {
    const leftSum = preSum[i - 1] - preSum[0];
    const rightSum = preSum[n] - preSum[i];

    if (leftSum === rightSum) return i - 1;
  }

  return -1;
};

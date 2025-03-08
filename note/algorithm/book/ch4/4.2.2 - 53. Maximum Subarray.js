/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let left = 0;
  let right = 0;
  let windowSum = 0;
  let maxSum = -Infinity;

  while (right < nums.length) {
    windowSum += nums[right];
    right += 1;

    maxSum = Math.max(maxSum, windowSum);

    while (windowSum < 0) {
      windowSum -= nums[left];
      left += 1;
    }
  }

  return maxSum;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  const n = nums.length;
  const dp = new Array(n).fill(-Infinity);

  let max = nums[0];
  dp[0] = nums[0];
  for (let i = 1; i < n; i += 1) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    max = Math.max(max, dp[i]);
  }

  return max;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  const n = nums.length;
  const preSum = new Array(n + 1);
  preSum[0] = 0;

  for (let i = 1; i <= n; i += 1) {
    preSum[i] = preSum[i - 1] + nums[i - 1];
  }

  let max = -Infinity;
  let minPreSum = Infinity;

  for (let i = 0; i < n; i += 1) {
    minPreSum = Math.min(minPreSum, preSum[i]);

    max = Math.max(max, preSum[i + 1] - minPreSum);
  }

  return max;
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((a, b) => a + b);

  if (sum % 2 !== 0) return false;

  const half = sum / 2;

  const dp = new Array(nums.length + 1).fill().map(() => new Array(half + 1).fill(false));

  for (let i = 0; i <= nums.length; i += 1) {
    dp[i][0] = true;
  }

  for (let i = 1; i <= nums.length; i += 1) {
    for (let j = 1; j <= half; j += 1) {
      if (j < nums[i - 1]) dp[i][j] = dp[i - 1][j];
      else {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
      }
    }
  }

  return dp[nums.length][half];
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((a, b) => a + b);

  if (sum % 2 !== 0) return false;

  const half = sum / 2;

  const dp = {};
  dp[0] = true;
  for (let i = 0; i < nums.length; i += 1) {
    const num = nums[i];
    // should reverse to avoid messy previous result
    for (let j = half; j >= num; j -= 1) {
      dp[j] = dp[j] || dp[j - num];
    }

    if (dp[half]) break;
  }

  return dp[half] || false;
};

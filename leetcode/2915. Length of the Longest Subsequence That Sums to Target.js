/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var lengthOfLongestSubsequence = function (nums, target) {
  const n = nums.length;
  const dp = new Array(n + 1).fill().map(() => new Array(target + 1).fill(-1));

  for (let i = 0; i <= n; i++) {
    dp[i][0] = 0;
  }

  for (let i = 1; i <= n; i += 1) {
    for (let j = 1; j <= target; j += 1) {
      dp[i][j] = dp[i - 1][j];

      if (j >= nums[i - 1] && dp[i - 1][j - nums[i - 1]] !== -1) {
        dp[i][j] = Math.max(1 + dp[i - 1][j - nums[i - 1]], dp[i][j]);
      }
    }
  }

  return dp[n][target];
};

// TLE
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var lengthOfLongestSubsequence = function (nums, target) {
  const n = nums.length;
  const dp = new Array(n);

  let max = -1;
  for (let i = 0; i < n; i += 1) {
    if (!dp[i]) {
      dp[i] = {};
      dp[i][nums[i]] = 1;
    }

    for (let j = 0; j < i; j += 1) {
      for (let sum in dp[j]) {
        let key = nums[i] + Number(sum);
        if (key <= target) dp[i][key] = Math.max(dp[j][sum] + 1, dp[i][key] || -Infinity);
      }
    }
    max = Math.max(max, dp[i][target] || -Infinity);
  }

  return max;
};

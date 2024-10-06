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

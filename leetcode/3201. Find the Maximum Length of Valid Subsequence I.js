// Time Limit Exceeded
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumLength = function (nums) {
  const n = nums.length;
  const dp = new Array(n).fill().map(() => ({}));

  let max = 2;

  dp[1][(nums[0] + nums[1]) % 2] = max;

  for (let i = 2; i < n; i += 1) {
    for (let j = 0; j < i; j += 1) {
      const validMod = (nums[i] + nums[j]) % 2;

      dp[i][validMod] = (dp[j][validMod] || 1) + 1;

      max = Math.max(max, dp[i][validMod]);
    }
  }

  return max;
};

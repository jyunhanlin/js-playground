/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSquareStreak = function (nums) {
  const len = nums.length;
  const dp = {};
  nums.sort((a, b) => a - b);

  for (let i = 0; i < len; i += 1) {
    const num = nums[i];

    const sr = Math.sqrt(num);

    dp[num] = 1;

    if (Number.isInteger(sr) && dp[sr]) {
      dp[num] = dp[sr] + 1;
    }
  }

  let result = Math.max(...Object.values(dp));

  return result !== 1 ? result : -1;
};

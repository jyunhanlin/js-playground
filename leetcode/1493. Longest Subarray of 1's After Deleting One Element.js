/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function (nums) {
  let res = 0;
  let start = 0,
    end = 0;

  let zeroIndex = -1;

  while (end < nums.length) {
    if (nums[end] === 1) {
      end += 1;
    } else {
      if (zeroIndex !== -1) start = zeroIndex + 1;
      zeroIndex = end;
      end += 1;
    }

    res = Math.max(res, end - start - 1);
  }

  return res;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function (nums) {
  const dp = new Array(nums.length).fill(0).map(() => new Array(2));

  dp[0] = [nums[0], 0];
  let max = 0;

  for (let i = 1; i < nums.length; i += 1) {
    if (nums[i] == 0) {
      dp[i][1] = dp[i - 1][0];
      dp[i][0] = 0;
    } else {
      dp[i][0] = dp[i - 1][0] + 1;
      dp[i][1] = dp[i - 1][1] + 1;
    }
    max = Math.max(dp[i][1], max);
  }

  return max;
};

/**
 * @param {number[]} nums
 * @param {number} firstLen
 * @param {number} secondLen
 * @return {number}
 */
var maxSumTwoNoOverlap = function (nums, firstLen, secondLen) {
  const dp = new Array(nums.length + 1).fill(0);

  for (let i = 0; i < nums.length; i += 1) {
    dp[i + 1] = dp[i] + nums[i];
  }

  const max = (first, second) => {
    let res = 0;
    let maxL = 0;

    for (let i = first + second; i < dp.length; i += 1) {
      maxL = Math.max(maxL, dp[i - second] - dp[i - second - first]);
      res = Math.max(res, maxL + dp[i] - dp[i - second]);
    }

    return res;
  };

  return Math.max(max(firstLen, secondLen), max(secondLen, firstLen));
};

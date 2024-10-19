/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxNonDecreasingLength = function (nums1, nums2) {
  const n = nums1.length;
  const dp = new Array(n).fill().map(() => new Array(2).fill(1));

  let max = 1;
  for (let i = 1; i < n; i += 1) {
    if (nums1[i] >= nums1[i - 1]) dp[i][0] = Math.max(dp[i][0], dp[i - 1][0] + 1);
    if (nums1[i] >= nums2[i - 1]) dp[i][0] = Math.max(dp[i][0], dp[i - 1][1] + 1);

    if (nums2[i] >= nums2[i - 1]) dp[i][1] = Math.max(dp[i][1], dp[i - 1][1] + 1);
    if (nums2[i] >= nums1[i - 1]) dp[i][1] = Math.max(dp[i][1], dp[i - 1][0] + 1);

    max = Math.max(max, dp[i][0], dp[i][1]);
  }

  return max;
};

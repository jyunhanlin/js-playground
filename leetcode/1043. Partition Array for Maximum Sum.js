/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var maxSumAfterPartitioning = function (arr, k) {
  const dp = new Array(arr.length + 1).fill(0);

  for (let i = 1; i <= arr.length; i += 1) {
    let curMax = 0;
    for (let j = 1; j <= k; j += 1) {
      if (i >= j) {
        curMax = Math.max(curMax, arr[i - j]);
        dp[i] = Math.max(dp[i], dp[i - j] + curMax * j);
      }
    }
  }

  return dp[arr.length];
};

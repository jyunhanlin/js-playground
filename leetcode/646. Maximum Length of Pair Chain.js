/**
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function (pairs) {
  pairs.sort((a, b) => a[0] - b[0]);
  const dp = new Array(pairs.length).fill(1);

  for (let j = 1; j < pairs.length; j += 1) {
    for (let i = 0; i < j; i += 1) {
      if (pairs[i][1] < pairs[j][0]) {
        dp[j] = Math.max(dp[j], dp[i] + 1);
      }
    }
  }

  return Math.max(...dp);
};

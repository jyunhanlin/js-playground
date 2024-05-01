/**
 * @param {number} n
 * @param {number} k
 * @param {number} maxPts
 * @return {number}
 */
var new21Game = function (n, k, maxPts) {
  if (k + maxPts <= n || k === 0) return 1;

  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1 / maxPts;

  for (let i = 2; i <= n; i += 1) {
    if (i <= k) {
      dp[i] = (1 + 1 / maxPts) * dp[i - 1];
    } else dp[i] = dp[i - 1];

    if (i > maxPts) {
      dp[i] -= dp[i - maxPts - 1] / maxPts;
    }
  }

  let ans = 0;

  for (let i = k; i <= n; i += 1) {
    ans += dp[i];
  }

  return ans;
};

// p1 = 0.1
// p2 = 0.1 * p1 + 0.1 = 0.11 = 1.1 * p1  // 1 + 1 & 2
// p3 = 0.1 * p2 + 0.1 * p1 + 0.1 =

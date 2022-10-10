// discuss: https://leetcode.com/problems/unique-binary-search-trees/discuss/1565543/C%2B%2BPython-5-Easy-Solutions-w-Explanation-or-Optimization-from-Brute-Force-to-DP-to-Catalan-O(N)

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let level = 2; level <= n; level += 1) {
    for (let root = 1; root <= level; root += 1) {
      dp[level] += dp[level - root] * dp[root - 1];
    }
  }

  return dp[n];
};

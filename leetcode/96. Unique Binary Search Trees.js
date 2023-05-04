// discuss: https://leetcode.com/problems/unique-binary-search-trees/discuss/1565543/C%2B%2BPython-5-Easy-Solutions-w-Explanation-or-Optimization-from-Brute-Force-to-DP-to-Catalan-O(N)

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i += 1) {
    for (let j = 0; j < i; j += 1) {
      dp[i] += dp[j] * dp[i - j - 1];
      // dp[j]: the number of nodes on the left side of root
      // dp[i - j - j]: the number of nodes on the right side of root
    }
  }

  return dp[n];
};

var numTrees = function (n) {
  const dp = new Array(n + 1).fill(0);

  const builder = (num) => {
    if (num <= 1) return 1;

    if (dp[num]) return dp[num];

    for (let i = 0; i < num; i += 1) {
      dp[num] += builder(i) * builder(num - i) - 1;
    }
    return dp[num];
  };

  return builder(n);
};

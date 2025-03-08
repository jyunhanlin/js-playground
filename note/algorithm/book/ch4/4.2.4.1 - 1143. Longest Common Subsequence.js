/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  const m = text1.length;
  const n = text2.length;

  const dp = new Array(m + 1).fill().map(() => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
};

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  const m = text1.length;
  const n = text2.length;

  const memo = new Array(m).fill().map(() => new Array(n).fill(-1));

  const dp = (i, j) => {
    if (i === -1 || j === -1) return 0;

    if (memo[i][j] !== -1) return memo[i][j];

    let len;
    if (text1[i] === text2[j]) len = dp(i - 1, j - 1) + 1;
    else len = Math.max(dp(i - 1, j), dp(i, j - 1));

    memo[i][j] = len;

    return len;
  };

  return dp(m - 1, n - 1);
};

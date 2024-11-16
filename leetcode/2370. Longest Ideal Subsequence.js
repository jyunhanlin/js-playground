/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestIdealString = function (s, k) {
  const n = s.length;
  const dp = new Array(n).fill().map(() => new Array(26).fill(0));

  const getCode = (char) => char.charCodeAt(0) - 97;

  let max = 1;
  dp[0][getCode(s[0])] = 1;

  for (let i = 1; i < n; i += 1) {
    const curCode = getCode(s[i]);
    const prevCode = getCode(s[i - 1]);

    for (let j = 0; j < 26; j += 1) {
      dp[i][j] = Math.max(dp[i][j], dp[i - 1][j]);
      if (Math.abs(curCode - j) <= k) dp[i][curCode] = Math.max(dp[i][curCode], dp[i - 1][j] + 1);
    }
    max = Math.max(max, dp[i][curCode]);
  }

  return max;
};

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var countSubstrings = function (s, t) {
  const m = s.length;
  const n = t.length;

  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0).map(() => new Array(2).fill(0)));

  let res = 0;

  for (let i = 0; i < m; i += 1) {
    dp[i][0][0] = s[i] === t[0] ? 1 : 0;
    dp[i][0][1] = s[i] === t[0] ? 0 : 1;
    res += dp[i][0][1];
  }

  for (let j = 1; j < n; j += 1) {
    dp[0][j][0] = s[0] === t[j] ? 1 : 0;
    dp[0][j][1] = s[0] === t[j] ? 0 : 1;
    res += dp[0][j][1];
  }

  for (let i = 1; i < m; i += 1) {
    for (let j = 1; j < n; j += 1) {
      dp[i][j][0] = s[i] === t[j] ? dp[i - 1][j - 1][0] + 1 : 0;
      dp[i][j][1] = s[i] === t[j] ? dp[i - 1][j - 1][1] : dp[i - 1][j - 1][0] + 1;
      res += dp[i][j][1];
    }
  }

  return res;
};
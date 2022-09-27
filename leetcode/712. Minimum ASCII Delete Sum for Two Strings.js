/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var minimumDeleteSum = function (s1, s2) {
  const asciiSum = (str) => str.split('').reduce((acc, cur) => (acc += cur.charCodeAt(0)), 0);
  let m = s1.length;
  let n = s2.length;

  const dp = new Array(m + 1).fill('').map(() => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + s1[i - 1].charCodeAt(0);
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return asciiSum(s1) + asciiSum(s2) - 2 * dp[m][n];
};

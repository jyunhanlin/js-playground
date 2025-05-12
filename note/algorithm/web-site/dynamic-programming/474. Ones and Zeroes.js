/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
  const dp = Array(strs.length + 1)
    .fill(0)
    .map(() =>
      Array(m + 1)
        .fill(0)
        .map(() => Array(n + 1).fill(0))
    );

  for (let i = 1; i <= strs.length; i++) {
    let count0 = 0;
    let count1 = 0;
    for (const str of strs[i - 1]) {
      str === '1' ? count1++ : count0++;
    }
    for (let z = 0; z <= m; z++) {
      for (let o = 0; o <= n; o++) {
        dp[i][z][o] = dp[i - 1][z][o];

        if (z >= count0 && o >= count1) {
          dp[i][z][o] = Math.max(1 + dp[i - 1][z - count0][o - count1], dp[i][z][o]);
        }
      }
    }
  }

  return dp[strs.length][m][n];
};

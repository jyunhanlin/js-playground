/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
  const len = strs.length;
  const dp = new Array(m + 1).fill().map(() => new Array(n + 1).fill(0));

  const record = [];
  for (let i = 0; i < len; i += 1) {
    const str = strs[i];
    record[i] = [0, 0];
    for (let j = 0; j < str.length; j += 1) {
      if (str[j] === '0') record[i][0] += 1;
      else record[i][1] += 1;
    }
  }

  for (let i = 0; i < len; i += 1) {
    const zc = record[i][0];
    const oc = record[i][1];
    for (let j = m; j >= zc; j -= 1) {
      for (let k = n; k >= oc; k -= 1) {
        dp[j][k] = Math.max(dp[j][k], dp[j - zc][k - oc] + 1);
      }
    }
  }

  return dp[m][n];
};

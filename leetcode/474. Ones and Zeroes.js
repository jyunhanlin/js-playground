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

/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
  const dp = Array(strs.length + 1)
    .fill()
    .map(() =>
      Array(m + 1)
        .fill()
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
        dp[i][z][o] = Math.max(
          z >= count0 && o >= count1 ? 1 + dp[i - 1][z - count0][o - count1] : 0,
          dp[i - 1][z][o]
        );
      }
    }
  }

  return dp[strs.length][m][n];
};

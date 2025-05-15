/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
  const m = s1.length;
  const n = s2.length;

  if (m + n !== s3.length) return false;

  const memo = Array.from({ length: m + 1 }, () => Array(n + 1).fill(-1));

  const dp = (i, j) => {
    const k = i + j;
    if (k === s3.length) return 1;
    if (memo[i][j] !== -1) return memo[i][j];

    let res = 0;
    if (i < m && s1[i] === s3[k]) {
      res = dp(i + 1, j);
    }

    if (j < n && s2[j] === s3[k]) {
      res |= dp(i, j + 1);
    }

    memo[i][j] = res;

    return memo[i][j];
  };

  return dp(0, 0);
};

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
  const m = s.length;
  const n = t.length;
  const memo = Array.from({ length: s.length }, () => Array(t.length).fill(-1));

  const dp = (i, j) => {
    if (j === n) return 1;
    if (n - j > m - i) return 0;
    if (memo[i][j] !== -1) return memo[i][j];

    let res = dp(i + 1, j);
    if (s[i] === t[j]) {
      res += dp(i + 1, j + 1);
    }

    memo[i][j] = res;
    return res;
  };

  return dp(0, 0);
};

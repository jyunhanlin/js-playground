/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  const m = s.length;
  const n = p.length;

  const memo = new Array(m).fill().map(() => new Array(n).fill(-1));

  const dp = (i, j) => {
    if (j === n) return i === m;

    if (i === m) {
      if ((n - j) % 2 === 1) return false;
      for (let k = j; k < n - 1; k += 2) {
        if (p[k + 1] !== '*') return false;
      }
      return true;
    }

    if (memo[i][j] !== -1) return memo[i][j];

    let res = false;
    if (s[i] === p[j] || p[j] === '.') {
      if (j < n - 1 && p[j + 1] === '*') {
        res = dp(i, j + 2) || dp(i + 1, j);
      } else {
        res = dp(i + 1, j + 1);
      }
    } else {
      if (j < n - 1 && p[j + 1] === '*') {
        res = dp(i, j + 2);
      }
    }

    memo[i][j] = res;
    return res;
  };

  return dp(0, 0);
};

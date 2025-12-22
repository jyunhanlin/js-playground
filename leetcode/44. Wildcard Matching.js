/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  const removeAdjStar = () => {
    let pp = '';
    for (let i = 0; i < p.length; i++) {
      if (p[i] === '*' && p[i - 1] === '*') {
        continue;
      }
      pp += p[i];
    }
    return pp;
  };

  const pp = removeAdjStar();

  const m = s.length;
  const n = pp.length;

  const memo = new Array(m).fill().map(() => new Array(n).fill(-1));

  const dp = (i, j) => {
    if (j === n) return i === m;

    if (i === m) {
      for (let k = j; k < n; k += 1) {
        if (pp[k] !== '*') return false;
      }
      return true;
    }

    if (memo[i][j] !== -1) return memo[i][j];

    let res = false;
    if (s[i] === pp[j] || pp[j] === '?') {
      res = dp(i + 1, j + 1);
    } else if (pp[j] === '*') {
      res = dp(i + 1, j) || dp(i, j + 1);
    }

    memo[i][j] = res ? 1 : 0;
    return res;
  };

  return dp(0, 0);
};

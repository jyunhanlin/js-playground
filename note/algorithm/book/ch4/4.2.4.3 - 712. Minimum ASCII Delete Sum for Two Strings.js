/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var minimumDeleteSum = function (s1, s2) {
  const m = s1.length;
  const n = s2.length;

  const memo = new Array(m).fill().map(() => new Array(n).fill(-1));

  const dp = (i, j) => {
    if (i === m) {
      return s2
        .slice(j)
        .split('')
        .reduce((a, c) => a + c.charCodeAt(0), 0);
    }

    if (j === n) {
      return s1
        .slice(i)
        .split('')
        .reduce((a, c) => a + c.charCodeAt(0), 0);
    }

    if (memo[i][j] !== -1) return memo[i][j];

    let sum;
    if (s1[i] === s2[j]) sum = dp(i + 1, j + 1);
    else {
      sum = Math.min(dp(i + 1, j) + s1.charCodeAt(i), dp(i, j + 1) + s2.charCodeAt(j));
    }

    memo[i][j] = sum;

    return sum;
  };

  return dp(0, 0);
};

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  const memo = {};

  const count = (lo, hi) => {
    const key = `${lo}-${hi}`;
    if (memo[key]) return memo[key];

    if (lo > hi) return 1;

    let res = 0;

    for (let i = lo; i <= hi; i += 1) {
      const left = count(lo, i - 1);
      const right = count(i + 1, hi);
      res += left * right;
    }

    memo[key] = res;

    return res;
  };

  return count(1, n);
};

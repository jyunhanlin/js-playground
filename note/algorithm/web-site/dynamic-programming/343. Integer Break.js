/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
  const memo = new Array(n + 1).fill(0);

  const dp = (num) => {
    if (num === 0) return 0;
    if (num === 1) return 1;

    if (memo[num] > 0) return memo[num];

    let res = -Infinity;
    for (let i = 1; i <= num; i += 1) {
      res = Math.max(res, i * Math.max(dp(num - i), num - i));
    }

    memo[num] = res;
    return memo[num];
  };

  return dp(n);
};

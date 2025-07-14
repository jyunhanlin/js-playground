/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n) {
  let numZeroes = 0;
  for (let i = 5; i <= n; i *= 5) {
    numZeroes += Math.floor(n / i);
  }
  return numZeroes;
};

/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n) {
  let res = 0;

  let divisor = 5;

  while (divisor <= n) {
    res += Math.floor(n / divisor);
    divisor *= 5;
  }

  return res;
};

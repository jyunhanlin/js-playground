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

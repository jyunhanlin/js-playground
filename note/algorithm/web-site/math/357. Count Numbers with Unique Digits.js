/**
 * @param {number} n
 * @return {number}
 */
var countNumbersWithUniqueDigits = function (n) {
  if (n == 0) return 1;
  if (n == 1) return 10;
  let res = 9;

  for (let i = 1; i < n; i++) {
    res *= 10 - i;
  }

  return res + countNumbersWithUniqueDigits(n - 1);
};

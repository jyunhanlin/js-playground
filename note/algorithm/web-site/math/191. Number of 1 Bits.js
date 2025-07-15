/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function (n) {
  let res = 0;

  while (n) {
    n &= n - 1;
    res += 1;
  }

  return res;
};

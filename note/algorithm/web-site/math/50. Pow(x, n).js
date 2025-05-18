/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  if (n === 0) return 1;

  if (n === -(2 ** 31)) {
    return myPow(1 / x, -(n + 1)) / x;
  }

  if (n < 0) return myPow(1 / x, -n);

  if (n % 2 === 1) return x * myPow(x, n - 1);
  else {
    const sub = myPow(x, n / 2);

    return sub * sub;
  }
};

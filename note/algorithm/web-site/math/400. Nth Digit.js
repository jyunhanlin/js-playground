/**
 * @param {number} n
 * @return {number}
 */
var findNthDigit = function (n) {
  let digit = 1;
  let base = 1;

  while (n > 9 * base * digit) {
    n -= 9 * base * digit;
    base *= 10;
    digit += 1;
  }

  const val = base + (n - 1) / digit;
  const index = (n - 1) % digit;

  return +`${val}`[index];
};

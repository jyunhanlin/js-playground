/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  return +`${x}`.split('').reverse().join('') === x;
};

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0) return false;

  let temp = x;
  let y = 0;

  while (temp > 0) {
    const lastNum = temp % 10;

    temp = Math.floor(temp / 10);

    y = y * 10 + lastNum;
  }

  return x === y;
};

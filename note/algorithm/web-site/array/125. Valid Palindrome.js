/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  const str = s.replace(/\s|[^0-9a-zA-Z]/g, '').toLowerCase();

  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) return false;

    left += 1;
    right -= 1;
  }

  return true;
};

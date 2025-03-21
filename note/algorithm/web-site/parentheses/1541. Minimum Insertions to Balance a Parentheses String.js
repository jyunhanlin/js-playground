/**
 * @param {string} s
 * @return {number}
 */
var minInsertions = function (s) {
  let left = 0;
  let right = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      right += 2;
      if (right % 2 === 1) {
        left += 1;
        right -= 1;
      }
    }

    if (s[i] === ')') {
      if (right === 0) {
        left += 1;
        right = 1;
      } else right -= 1;
    }
  }
  return left + right;
};

/**
 * @param {string} s
 * @return {number}
 */
var maxProduct = function (s) {
  let result = 0;
  const backtracking = (i, s1, s2) => {
    if (i >= s.length) {
      if (isValid(s1) && isValid(s2)) result = Math.max(result, s1.length * s2.length);
      return;
    }

    backtracking(i + 1, s1 + s[i], s2);

    backtracking(i + 1, s1, s2 + s[i]);

    backtracking(i + 1, s1, s2);
  };

  backtracking(0, '', '');

  return result;
};

const isValid = (s) => {
  let left = 0,
    right = s.length - 1;

  while (left <= right) {
    if (s[left] === s[right]) {
      left++;
      right--;
    } else {
      return false;
    }
  }

  return true;
};

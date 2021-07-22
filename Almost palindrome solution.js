/**
 * @param {string} s
 * @return {boolean}
 */
const validAlmostPalindrome = (s) => {
  let left = 0,
    right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return validSubPalindrome(s, left + 1, right) || validSubPalindrome(s, left, right - 1);
    }

    left++;
    right--;
  }

  return true;
};

/**
 * @param {string} s
 * @param {number} left
 * @param {number} right
 * @return {boolean}
 */
const validSubPalindrome = (s, left, right) => {
  let start = left,
    end = right;
  while (start < end) {
    if (s[start] !== s[end]) return false;
    start++;
    end--;
  }

  return true;
};
